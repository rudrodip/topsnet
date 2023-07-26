type ZenodoData = {
  aggregations: {
    access_right: {
      buckets: {
        doc_count: number;
        key: string;
      }[];
    };
    file_type: {
      buckets: {
        doc_count: number;
        key: string;
      }[];
    };
    keywords: {
      buckets: {
        doc_count: number;
        key: string;
      }[];
    };
    type: {
      buckets: {
        doc_count: number;
        key: string;
      }[];
    };
  };
  hits: {
    hits: {
      conceptdoi: string;
      description: string;
      title: string;
      version: string;
      metadata: {
        access_right: string;
        contributors: {
          affiliation: string;
          name: string;
          type: string;
        }[];
        creators: {
          affiliation: string;
          name: string;
        }[];
        description: string;
        doi: string;
        keywords: string[];
        language: string;
        license: {
          id: string;
        };
        publication_date: string;
        resource_type: {
          subtype: string;
          title: string;
          type: string;
        };
        title: string;
        version: string;
      };
      stats: {
        downloads: number;
        unique_downloads: number;
        unique_views: number;
        version_downloads: number;
        version_unique_downloads: number;
        version_unique_views: number;
        version_views: number;
        version_volume: number;
        views: number;
        volume: number;
      };
    }[];
    total: number;
  };
  links: {
    next: string;
    self: string;
  };
};

type ZenodoQueryParams = {
  q?: string;
  status?: string;
  sort?: string;
  page?: number;
  size?: number;
  all_versions?: number | string;
  communities?: string;
  type?: string;
  subtype?: string;
  bounds?: string;
  custom?: string;
};

export type {ZenodoQueryParams, ZenodoData}