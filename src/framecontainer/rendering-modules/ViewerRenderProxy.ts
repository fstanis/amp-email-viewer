import { FrameContainer } from '../FrameContainer';
import { Messaging } from '@ampproject/viewer-messaging';
import { TemplateProxyRequest, TemplateProxyResponse } from './ProxyRequest';
import { Config } from '../../config';
import { parseHTMLFragment, serializeHTML, postJSON } from '../../util';
import { modules as preprocessingModules } from '../../preprocessing/preprocessing-modules/index';

const TEMPLATE_PREPROCESSING_MODULES = [
  'HyperlinkRewrite',
  'ImageURLRewrite',
];

/**
 * Reacts to changes to the AMP document's height and resizes the iframe to
 * adjust to them.
 */
class ViewerRenderProxyImpl {
  private readonly config: Config;
  private readonly messaging: Messaging;

  constructor(frameContainer: FrameContainer) {
    this.config = frameContainer.getConfig();
    this.messaging = frameContainer.getMessaging();
  }

  start(): void {
    if (!this.config.templateProxyURL) {
      return;
    }
    this.messaging.registerHandler(
      'viewerRenderTemplate',
      this.viewerRenderTemplateHandler
    );
  }

  private viewerRenderTemplateHandler = async (
    name: string,
    data: TemplateProxyRequest,
    rsvp: boolean
  ): Promise<TemplateProxyResponse> => {
    const proxyURL = this.config.templateProxyURL!;
    const resp: TemplateProxyResponse = await postJSON(proxyURL, data);
    if (this.config.processTemplateProxyOutput) {
      resp.html = await this.processHTML(resp.html);
    }
    return resp;
  };

  private async processHTML(input: string): Promise<string> {
    if (!this.config.processTemplateProxyOutput || !input) {
      return input;
    }

    const doc = parseHTMLFragment(input);
    const moduleSet = new Set(TEMPLATE_PREPROCESSING_MODULES);
    for (const module of preprocessingModules) {
      if (!moduleSet.has(module.name)) {
        continue;
      }
      if ('processDocument' in module) {
        await module.processDocument(doc, this.config);
      }
    }
    return serializeHTML(doc);
  }

  documentLoaded(): void {}
  documentUnloaded(): void {}
}

function load(frameContainer: FrameContainer) {
  const impl = new ViewerRenderProxyImpl(frameContainer);
  impl.start();
  return impl;
}

export const module = {
  name: 'ViewerRenderProxy',
  load,
};
