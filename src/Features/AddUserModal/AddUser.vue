<template>
  <div class="backdrop" @click="showUser"></div>
  <dialog open>
    <form @submit.prevent="submitData">
      <h3>Add members</h3>
      <div class="form-control">
        <label for="name">Name</label>
        <input id="title" name="name" type="text" ref="nameInput" />
      </div>
      <div class="form-control">
        <label for="company">Company</label>
        <input id="title" name="company" type="text" ref="companyInput" />
      </div>
      <div class="form-control">
        <label for="status">Status</label>
        <input id="title" name="status" type="text" ref="statusInput" />
      </div>

      <div class="form-control">
        <label for="notes">Notes</label>
        <input id="link" name="notes" type="text" ref="notesInput" />
      </div>
      <div class="cancel-save">
        <button type="button" @click="showUser">Cancel</button>
        <button type="submit">Save</button>
      </div>
    </form>
  </dialog>
</template>

<script>
export default {
  inject: ['addResource', 'showUser'],

  methods: {
    submitData() {
      const enteredName = this.$refs.nameInput.value;
      const enteredCompany = this.$refs.companyInput.value;
      const enteredStatus = this.$refs.statusInput.value;
      const enteredNotes = this.$refs.notesInput.value;

      if (
        enteredName.trim() === '' ||
        enteredCompany.trim() === '' ||
        enteredStatus.trim() === '' ||
        enteredNotes.trim() === ''
      ) {
        return;
      }

      this.addResource(
        enteredName,
        enteredCompany,
        enteredStatus,
        enteredNotes
      );
    },
  },
};
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}

dialog {
  position: fixed;
  top: 15vh;
  left: 10%;
  width: 80%;
  z-index: 100;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
}

form {
  width: 80%;
  margin: 10px auto;
}

label {
  /* font-weight: bold; */
  display: block;
  margin-bottom: 0.5rem;
}

button {
  padding: 0.5rem 1.5rem;
  font-family: inherit;
  background-color: #24a0ed;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 20px;
}

button:hover,
button:active {
  background-color: #48b3f5;
}

button[type='button'] {
  background-color: white;
  color: #24a0ed;
  border: 2px solid #24a0ed;
  padding: 0.5rem 1.1rem;
}

button[type='button']:hover {
  background-color: #f3efef;
}

input {
  display: block;
  width: 100%;
  font: inherit;
  padding: 0.3rem;
  border: 1px solid #ccc;
}

input:focus {
  outline: none;
  border-color: #3a0061;
  background-color: #f7ebff;
}

.form-control {
  margin: 1rem 0;
}

.cancel-save {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
}

@media (min-width: 768px) {
  dialog {
    left: calc(50% - 20rem);
    width: 40rem;
  }
}
</style>
