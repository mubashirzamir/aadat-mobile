import axios from 'axios';

class LocalAadatService implements AadatService {
  private static apiBaseUrl = 'http://localhost:3001'; // Change to your server URL

  static async initialize(): Promise<[AadatMetaMap, AadatMap] | []> {
    try {
      return await this.fetchAllData();
    } catch (error) {
      console.error('Initialization error:', error);
      return [];
    }
  }

  private static async fetchAllData(): Promise<[AadatMetaMap, AadatMap]> {
    const aadatMetaMap: AadatMetaMap = {};
    const aadatMap: AadatMap = {};

    // 1. Get all directories
    const { data: dirData } = await axios.get(`${this.apiBaseUrl}/api/directories`);
    const directories = dirData.directories;

    // 2. Process each directory
    for (const dir of directories) {
      try {
        // Get meta.json
        const { data: meta } = await axios.get<AadatMeta>(
          `${this.apiBaseUrl}/storage/${dir}/meta.json`
        );
        aadatMetaMap[meta.id] = meta;

        // Get all files in directory
        const { data: filesData } = await axios.get(`${this.apiBaseUrl}/api/files/${dir}`);
        const jsonFiles = filesData.files.filter((f: string) => f !== 'meta.json');

        // Load each data file
        for (const file of jsonFiles) {
          const { data: aadat } = await axios.get<Aadat>(
            `${this.apiBaseUrl}/storage/${dir}/${file}`
          );
          aadatMap[meta.id] = aadat;
        }
      } catch (error) {
        console.error(`Error processing directory ${dir}:`, error);
      }
    }

    return [aadatMetaMap, aadatMap];
  }

  // Optional: Add methods for direct file access
  static async getMeta(id: number): Promise<AadatMeta | null> {
    try {
      const { data } = await axios.get<AadatMeta>(`${this.apiBaseUrl}/api/meta/${id}`);
      return data;
    } catch (error) {
      console.error(`Error fetching meta for ID ${id}:`, error);
      return null;
    }
  }

  static async getAadat(id: number): Promise<Aadat | null> {
    try {
      const { data } = await axios.get<Aadat>(`${this.apiBaseUrl}/api/aadat/${id}`);
      return data;
    } catch (error) {
      console.error(`Error fetching aadat for ID ${id}:`, error);
      return null;
    }
  }
}

export default LocalAadatService;
