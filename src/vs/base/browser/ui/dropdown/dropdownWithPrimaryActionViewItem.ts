/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IContextMenuProvider } from 'vs/base/browser/contextmenu';
import { ActionViewItem, BaseActionViewItem, IActionViewItemOptions } from 'vs/base/browser/ui/actionbar/actionViewItems';
import { DropdownMenuActionViewItem } from 'vs/base/browser/ui/dropdown/dropdownActionViewItem';
import { IAction } from 'vs/base/common/actions';
import { append, $ } from 'vs/base/browser/dom';


export interface IDropdownWithPrimaryActionViewItemOptions {
	readonly className: string;
	readonly dropdownIcon?: string;
	readonly primaryActionOptions?: IActionViewItemOptions;
}

export class DropdownWithPrimaryActionViewItem extends BaseActionViewItem {
	private _primaryAction: ActionViewItem;
	private _dropdown: DropdownMenuActionViewItem;
	private _container: HTMLElement | null = null;
	constructor(
		primaryAction: IAction,
		dropdownAction: IAction,
		dropdownMenuActions: IAction[],
		private readonly _contextMenuProvider: IContextMenuProvider,
		private readonly _options: IDropdownWithPrimaryActionViewItemOptions
	) {
		super(null, primaryAction);
		this._primaryAction = new ActionViewItem(undefined, primaryAction, _options.primaryActionOptions);
		this._dropdown = new DropdownMenuActionViewItem(dropdownAction, dropdownMenuActions, this._contextMenuProvider, { menuAsChild: true, classNames: ['codicon', _options.dropdownIcon || 'codicon-chevron-down'] });
	}

	override render(container: HTMLElement): void {
		this._container = container;
		super.render(container);
		if (!container || !this.element) {
			return;
		}
		this.element = append(this._container, $(''));
		this.element.className = this._options.className;
		this._primaryAction.render(this.element);
		this._dropdown.render(this.element);
		this._stylize();
	}

	private _stylize(): void {
		if (!this.element || !this._dropdown.element || !this._primaryAction.element) {
			return;
		}
		const elementStyle = this.element.style;
		elementStyle.display = 'flex';
		elementStyle.flexDirection = 'row';
		const dropdownStyle = this._dropdown.element.style;
		dropdownStyle.paddingLeft = '0px';
		dropdownStyle.fontSize = '12px';
		dropdownStyle.maxWidth = '6px';
		dropdownStyle.lineHeight = '16px';
		dropdownStyle.marginLeft = '0px';
		const primaryActionStyle = this._primaryAction.element.style;
		primaryActionStyle.marginRight = '0px';
		if (this._primaryAction.element.children[0]) {
			(this._primaryAction.element.children[0] as HTMLElement).style.paddingRight = '0px';
		}
	}

	public updateDropdown(dropdownAction: ActionViewItem, dropdownMenuActions: IAction[], dropdownIcon?: string): void {
		this._dropdown?.dispose();
		this._dropdown = new DropdownMenuActionViewItem(dropdownAction.getAction(), dropdownMenuActions, this._contextMenuProvider, { menuAsChild: true, classNames: ['codicon', dropdownIcon || 'codicon-chevron-down'] });
		if (this.element) {
			this._dropdown.render(this.element);
			this._stylize();
		}
	}
}
