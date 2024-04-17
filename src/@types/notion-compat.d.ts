declare module "notion-compat" {
  import { Client } from "@notionhq/client";
  import { ExtendedRecordMap } from "notion-types";

  export class NotionCompatAPI {
    constructor(client: Client);
    getPage(pageId: string): Promise<ExtendedRecordMap>;
  }
}
