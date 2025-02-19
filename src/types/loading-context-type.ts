export interface LoadingContextType {
  loading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}