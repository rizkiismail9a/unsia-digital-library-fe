/**
 *
 * @param {String} url
 * @param {Object} options
 * @returns
 */
export const useBaseAPI = (url, options = {}) => {
  const config = useRuntimeConfig();
  const { data } = useAuth();

  return $fetch(`${config.public.apiBaseUrl}${url}`, {
    ...options,
    headers: {
      Authorization: data.value
        ? `Bearer ${data.value.user?.accessToken}`
        : undefined,
    },
  });
};
