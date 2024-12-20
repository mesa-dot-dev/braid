import { queryOptions, useMutation } from '@tanstack/react-query';
import { hc, queryClient } from '../lib/clients';

export const productsQuery = queryOptions({
  queryKey: ['products'],
  queryFn: () => hc['products'].$get().then((r) => r.json()),
});

export const configsQuery = (installationId: number) =>
  queryOptions({
    queryKey: ['configs', installationId],
    queryFn: () => hc['configs'].$get({ query: { installationId: installationId.toString() } }).then((r) => r.json()),
  });

export const useToggleServiceFeed = (installationId: number) => {
  return useMutation({
    mutationFn: (data: { product: string; service: string; action: 'add' | 'remove' }) =>
      hc['configs'].$post({ json: { ...data, installationId } }).then((r) => r.json()),
    onMutate: (data) => {
      const previousData = queryClient.getQueryData(configsQuery(installationId).queryKey);
      const productConfig = previousData?.configs?.find((c) => c.product === data.product);
      const productServices = productConfig?.services || [];
      queryClient.setQueryData(configsQuery(installationId).queryKey, (oldData) => {
        return productConfig
          ? {
              configs: oldData!.configs.map((config) => {
                if (config.product === productConfig.product) {
                  return {
                    ...config,
                    services:
                      data.action === 'add'
                        ? [...productServices, data.service]
                        : productServices.filter((s) => s !== data.service),
                  };
                }
                return config;
              }),
            }
          : {
              configs: [
                {
                  installationId: 0,
                  product: data.product,
                  services: [data.service],
                },
              ],
            };
      });
      return { previousData };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(configsQuery(installationId).queryKey, (oldData) => {
        return {
          ...oldData,
          configs: oldData!.configs.map((c) => (c.product === data.config.product ? data.config : c)),
        };
      });
    },
    onError: (error, _, context) => {
      console.error(error);
      queryClient.setQueryData(configsQuery(installationId).queryKey, context?.previousData);
    },
  });
};
