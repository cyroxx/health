/**
 * @copyright Copyright (c) 2016 Morris Jobke <hey@morrisjobke.de>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

(function() {
	OCA.Health = OCA.Health || {};

	/**
	 * @class OCA.Health.Operation
	 */
	OCA.Health.Operation =
		OCA.WorkflowEngine.Operation.extend({
			defaults: {
				'class': 'OCA\\Health\\Operation',
				'name': '',
				'checks': [],
				'operation': ''
			}
		});

	/**
	 * @class OCA.Health.OperationsCollection
	 *
	 * collection for all configured operations
	 */
	OCA.Health.OperationsCollection =
		OCA.WorkflowEngine.OperationsCollection.extend({
			model: OCA.Health.Operation
		});

	/**
	 * @class OCA.Health.OperationView
	 *
	 * this creates the view for a single operation
	 */
	OCA.Health.OperationView =
		OCA.WorkflowEngine.OperationView.extend({
			model: OCA.Health.Operation,
			render: function() {
				var $el = OCA.WorkflowEngine.OperationView.prototype.render.apply(this);
				$el.find('input.operation-operation')
					.css('width', '400px')
					.select2({
						placeholder: t('health', 'Mode…'),
						data: [
							{
								id: 'keep;preserve',
								text: t('health', 'Keep original, preserve existing PDFs'),
							},
							{
								id: 'keep;overwrite',
								text: t('health', 'Keep original, overwrite existing PDF'),
							},
							{
								id: 'delete;preserve',
								text: t('health', 'Delete original, preserve existing PDFs'),
							},
							{
								id: 'delete;overwrite',
								text: t('health', 'Delete original, overwrite existing PDF'),
							},
						],
					});
			}
		});

	/**
	 * @class OCA.Health.OperationsView
	 *
	 * this creates the view for configured operations
	 */
	OCA.Health.OperationsView =
		OCA.WorkflowEngine.OperationsView.extend({
			initialize: function() {
				OCA.WorkflowEngine.OperationsView.prototype.initialize.apply(this, [
					'OCA\\Health\\Operation'
				]);
			},
			renderOperation: function(operation) {
				var subView = new OCA.Health.OperationView({
					model: operation
				});

				OCA.WorkflowEngine.OperationsView.prototype.renderOperation.apply(this, [
					subView
				]);
			}
		});
})();


$(document).ready(function() {
	OC.SystemTags.collection.fetch({
		success: function() {
			new OCA.Health.OperationsView({
				el: '#health .rules',
				collection: new OCA.Health.OperationsCollection()
			});
		}
	});
});
