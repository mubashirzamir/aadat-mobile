enum AadatJsonType {
  AADAT = 'aadat',
  AADAT_META = 'aadat_meta',
}

type AadatMeta = {
  json_type: AadatJsonType.AADAT_META;
  id: number;
  name: string;
  color: string;
  icon: string;
  createdAt: string;
};

type Aadat = {
  json_type: AadatJsonType.AADAT;
  id: number;
  year: number;
  entries: {
    [date: string]: {
      done: boolean;
      note?: string;
    };
  };
};

type AadatMap = {
  [id: number]: Aadat;
};

type AadatMetaMap = {
  [id: number]: AadatMeta;
};
