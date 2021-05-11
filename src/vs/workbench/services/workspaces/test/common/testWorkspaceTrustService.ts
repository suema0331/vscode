/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Emitter } from 'vs/base/common/event';
import { IDisposable } from 'vs/base/common/lifecycle';
import { URI } from 'vs/base/common/uri';
import { IWorkspaceTrustManagementService, IWorkspaceTrustRequestService, IWorkspaceTrustTransitionParticipant, IWorkspaceTrustUriInfo, WorkspaceTrustRequestOptions } from 'vs/platform/workspace/common/workspaceTrust';


export class TestWorkspaceTrustManagementService implements IWorkspaceTrustManagementService {
	_serviceBrand: undefined;

	private _onDidChangeTrust = new Emitter<boolean>();
	onDidChangeTrust = this._onDidChangeTrust.event;

	private _onDidChangeTrustedFolders = new Emitter<void>();
	onDidChangeTrustedFolders = this._onDidChangeTrustedFolders.event;

	private trusted: boolean;

	constructor(trusted: boolean = true) {
		this.trusted = trusted;
	}

	addWorkspaceTrustTransitionParticipant(participant: IWorkspaceTrustTransitionParticipant): IDisposable {
		throw new Error('Method not implemented.');
	}

	getTrustedFolders(): URI[] {
		throw new Error('Method not implemented.');
	}

	setParentFolderTrust(trusted: boolean): void {
		throw new Error('Method not implemented.');
	}

	getUriTrustInfo(uri: URI): IWorkspaceTrustUriInfo {
		throw new Error('Method not implemented.');
	}

	async setTrustedFolders(folders: URI[]): Promise<void> {
		throw new Error('Method not implemented.');
	}

	async setUrisTrust(uris: URI[], trusted: boolean): Promise<void> {
		throw new Error('Method not implemented.');
	}

	canSetParentFolderTrust(): boolean {
		throw new Error('Method not implemented.');
	}

	canSetWorkspaceTrust(): boolean {
		throw new Error('Method not implemented.');
	}

	isWorkpaceTrusted(): boolean {
		return this.trusted;
	}

	async setWorkspaceTrust(trusted: boolean): Promise<void> {
		if (this.trusted !== trusted) {
			this.trusted = trusted;
			this._onDidChangeTrust.fire(this.trusted);
		}
	}
}

export class TestWorkspaceTrustRequestService implements IWorkspaceTrustRequestService {
	_serviceBrand: any;

	private readonly _onDidInitiateWorkspaceTrustRequest = new Emitter<WorkspaceTrustRequestOptions>();
	readonly onDidInitiateWorkspaceTrustRequest = this._onDidInitiateWorkspaceTrustRequest.event;

	private readonly _onDidCompleteWorkspaceTrustRequest = new Emitter<boolean>();
	readonly onDidCompleteWorkspaceTrustRequest = this._onDidCompleteWorkspaceTrustRequest.event;

	constructor(private readonly _trusted: boolean) { }

	cancelRequest(): void {
		throw new Error('Method not implemented.');
	}

	async completeRequest(trusted?: boolean): Promise<void> {
		throw new Error('Method not implemented.');
	}

	async requestWorkspaceTrust(options?: WorkspaceTrustRequestOptions): Promise<boolean> {
		return this._trusted;
	}
}
