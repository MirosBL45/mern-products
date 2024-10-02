export function showErrorToast(toast: any, message: string) {
  toast({
    title: 'Error',
    description: message,
    status: 'error',
    isClosable: true,
  });
}

export function showSuccessToast(toast: any, message: string) {
  toast({
    title: 'Success',
    description: message,
    status: 'success',
    isClosable: true,
  });
}
