export const useToast = () => {
  const toast = useState("toast", () => ({
    show: false,
    message: "",
    type: "success",
  }));

  /**
   *
   * @param {string} message
   * @param {'success' | 'error' | 'info'} type
   */
  const showToast = (message, type) => {
    toast.value = {
      show: true,
      message,
      type,
    };

    // auto hide
    setTimeout(() => {
      toast.value.show = false;
    }, 5000);
  };

  return {
    toast,
    showToast,
  };
};
