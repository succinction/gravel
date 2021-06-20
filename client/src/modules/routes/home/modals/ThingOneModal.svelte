<script lang="ts">
  import Modal from '../../../common/modals/components/Modal.svelte'
  import { modalStore } from '../../../common/modals/stores/ModalStore'

  function handleClick() {
    modalStore.show('thingTwo')
  }

</script>

<Modal id="thingOne" title="Thing One" buttons={[{text: 'Open Thing Two Modal', onClick: handleClick}]}>
  Hello thing one
</Modal>