import { ref } from "vue";
import PageModal from "./../components/page-modal";
type CallbackFn = (item?: any) => void;

export default function usePageModal(
  createCb?: CallbackFn,
  editCb?: CallbackFn
) {
  const pageModalRef = ref<InstanceType<typeof PageModal>>();
  const handleCreateData = () => {
    defaultInfo.value = {};
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true;
    }
    createCb && createCb();
  };

  const defaultInfo = ref({});
  const handleEditData = (item: any) => {
    defaultInfo.value = { ...item };
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true;
    }
    editCb && editCb(item);
  };
  return {
    pageModalRef,
    handleCreateData,
    handleEditData,
    defaultInfo,
  };
}
