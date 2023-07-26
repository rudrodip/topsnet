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
          orcid: string;
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

/**
 * Represents the query parameters for the Zenodo API request.
 *
 * @param {string} q - Search query using Elasticsearch query string syntax.
 * @param {string} status - Filter result based on the deposit status (either draft or published).
 * @param {string} sort - Sort order (bestmatch or mostrecent). Prefix with minus to change from ascending to descending (e.g., -mostrecent).
 * @param {number} page - Page number for pagination.
 * @param {number} size - Number of results to return per page.
 * @param {number | string} all_versions - Show (true or 1) or hide (false or 0) all versions of records.
 * @param {string} communities - Return records that are part of the specified communities. (Use community identifier)
 * @param {string} type - Return records of the specified type. (Publication, Poster, Presentation, etc.)
 * @param {string} subtype - Return records of the specified subtype. (Journal article, Preprint, Proposal, etc.)
 * @param {string} bounds - Return records filtered by a geolocation bounding box. (Format: bounds=143.37158,-38.99357,146.90918,-37.35269)
 * @param {string} custom - Return records containing the specified custom keywords. (Format: custom=[field_name]:field_value)
 */
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