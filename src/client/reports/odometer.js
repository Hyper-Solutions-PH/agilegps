/* Copyright (c) 2016 Grant Miner */
'use strict';
import {translate as t} from '../i18n';
const m = require('mithril');
const tohms = require('./tohms');
const street = require('../../common/addressdisplay').street;
const city = require('../../common/addressdisplay').city;
const state = require('../../common/addressdisplay').state;
const tomiles = require('../tomiles');
const _ = require('lodash');
const isUserMetric = require('../isUserMetric');
const formatDate = require('../formatDate');

export function view(ctrl, args, extras) {

    if (!(args.result() && args.result().vehicles && args.result().results)) {
        return '';
    }

	return m('div', [
		m('div', [
			m('table.table-condensed table-bordered table-striped dataTable', [
				m('thead', [
					m('td', t('State')),
					m('td', isUserMetric() ? t('Kilometers') : t('Miles')),
					m('td', t('Start Odometer')),
					m('td', t('End Odometer'))
				]),
				m('tbody', _.map(Object.keys(args.result().vehicles), function(vid) {
					return [
						m('tr', m('td[colspan=7].group', args.result().vehicles[vid].name)),
						args.result().results[vid].map(function(item) {
							return m('tr', [
								m('td', item.state),
	                            m('td', tomiles(item.odometerEnd - item.odometerStart)),
								m('td', tomiles(item.odometerStart)),
	                            m('td', tomiles(item.odometerEnd)),
						   ])
						})
					]
				}))
			])
		]),
	]);
}
