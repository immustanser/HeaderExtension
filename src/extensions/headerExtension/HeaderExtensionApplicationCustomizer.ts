import * as React from 'react';
import * as ReactDom from 'react-dom';
import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer, PlaceholderContent, PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'HeaderExtensionApplicationCustomizerStrings';
import { sp } from '@pnp/sp';
import { IHeaderProps } from './IHeaderProps';
import Header from './Header';

const LOG_SOURCE: string = 'HeaderExtensionApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IHeaderExtensionApplicationCustomizerProperties {
  // This is an example; replace with your own property
  HeaderListName: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class HeaderExtensionApplicationCustomizer
  extends BaseApplicationCustomizer<IHeaderExtensionApplicationCustomizerProperties> {

    private _topPlaceholderHeader: PlaceholderContent | undefined;

    private _bottomPlaceholderFooter: PlaceholderContent | undefined;

  @override
  public onInit(): Promise<void> {
    sp.setup({
      spfxContext: this.context
    });

    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHoldersHeaderandFooter);
    //Added the below line code to handle the possible changes on the existence of placeholders.  
    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHoldersHeaderandFooter);
    //The below code is used to call render method for generating the HTML elements.  
    this._renderPlaceHoldersHeaderandFooter();

    return Promise.resolve();

  }


  private _renderPlaceHoldersHeaderandFooter(): void {

    console.log('HeaderAndFooterAppExtensionApplicationCustomizer._renderPlaceHoldersHeaderandFooter()');

    console.log('Available placeholders are as below: ',
      this.context.placeholderProvider.placeholderNames.map(name => PlaceholderName[name]).join(', '));

    //Handling the top placeholder - header section
    if (!this._topPlaceholderHeader) {
      this._topPlaceholderHeader =
        this.context.placeholderProvider.tryCreateContent(
          PlaceholderName.Top,
          {
            onDispose: this._onDispose
          });

      //The extension should not assume that the expected placeholder is available.  
      if (!this._topPlaceholderHeader) {
        console.error('The expected placeholder (top heder) was not found.');
        return;
      }

      if (this.properties) {
        if (this._topPlaceholderHeader.domElement) {
          const element: React.ReactElement<IHeaderProps> = React.createElement(
            Header,
            {
              HeaderListName: this.properties.HeaderListName,
            }
          );
          ReactDom.render(element, this._topPlaceholderHeader.domElement);
        }
      }
    }
  }

  private _onDispose(): void {
    console.log('[HeaderAndFooterAppExtensionApplicationCustomizer._onDispose] Disposed from the top header and bottom footer placeholders.');

  }


}
