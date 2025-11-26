/* eslint-disable no-undef */
import { trackAPICall, trackAPIError } from "./analytics";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  process.env.REACT_APP_API_BASE_URL ||
  "https://api.yourapp.com";

class APIClient {
  constructor(baseURL = BASE_URL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const startTime = performance.now();
    const url = `${this.baseURL}${endpoint}`;
    const method = options.method || "GET";

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      });

      const duration = performance.now() - startTime;

      // Track successful API call
      trackAPICall(endpoint, method, response.status, duration);

      if (!response.ok) {
        const error = await response.json().catch(() => ({
          message: "Request failed",
        }));
        throw new Error(error.message || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      const duration = performance.now() - startTime;

      // Track API error
      trackAPIError(endpoint, method, error.message);
      trackAPICall(endpoint, method, 0, duration); // 0 for failed requests

      throw error;
    }
  }

  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: "GET" });
  }

  post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: "DELETE" });
  }
}

export const apiClient = new APIClient();
export default apiClient;
