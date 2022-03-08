<template>
  <add-user v-if="hideModal"></add-user>
  <div class="d-page">
    <div class="ds-description">
      <header class="main-heading">
        <div>
          <h1>Team Members</h1>
          <button @click="showUser">
            Add Members <i class="bi bi-plus-lg"></i>
          </button>
        </div>
      </header>

      <div class="flexbox">
        <div
          :class="toggleClass ? 'dropdown on' : 'dropdown'"
          data-control="checkbox-dropdown"
        >
          <label @click="showClass" class="dropdown-label">Company</label>

          <div class="dropdown-list">
            <label class="dropdown-option">
              <input
                type="checkbox"
                name="dropdown-group"
                v-model="select_dropdown"
                @click="dropdownSelectAll"
              />
              Select all
            </label>

            <label
              class="dropdown-option"
              v-for="(d, index) in data"
              :key="index"
            >
              <input
                type="checkbox"
                name="dropdown-group"
                :value="d.id"
                v-model="selectAllDrop"
              />
              {{ d.company }}
            </label>
          </div>
        </div>

        <div
          :class="toggleClassStatus ? 'dropdown on' : 'dropdown'"
          data-control="checkbox-dropdown"
        >
          <label
            class="dropdown-label"
            @click="
              sortStatus();
              showClassStatus();
            "
            >Status</label
          >
        </div>
      </div>

      <table class="content-table">
        <thead>
          <tr class="table_headings">
            <th>
              <input type="checkbox" v-model="select_all" @click="select" />
            </th>
            <th>Name</th>
            <th>Company</th>
            <th>Status</th>
            <th>Last Updated</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(d, index) in data" :key="index">
            <td><input type="checkbox" :value="d.id" v-model="selected" /></td>
            <td data-label="Name" v-text="d.name"></td>
            <td data-label="Company">{{ d.company }}</td>
            <td data-label="Status">{{ d.status }}</td>
            <td data-label="Last Updated">{{ d.lastUpdated }}</td>
            <td data-label="Notes">{{ d.notes }}</td>

            <td style="text-align: center" data-label="Delete">
              <i class="bi bi-trash3-fill" @click="deleteRow(index)"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import AddUser from '../AddUserModal/AddUser.vue';

export default {
  components: {
    AddUser,
  },
  data() {
    return {
      data: [
        {
          id: 1,
          name: 'Ajay Singh Bhadauriya',
          company: 'Wissen Infotech',
          status: 'Active',
          lastUpdated: '03/03/2022',
          notes: 'Good in learning',
        },

        {
          id: 2,
          name: 'Wayne Ronney',
          company: 'DC United',
          status: 'Active',
          lastUpdated: '07/07/2017',
          notes: 'ManUtd Highest Scorer',
        },
        {
          id: 3,
          name: 'Ryan Giggs',
          company: 'Manchester United',
          status: 'Closed',
          lastUpdated: '03/08/2011',
          notes: 'Most matches played',
        },
        {
          id: 4,
          name: 'Zlatan Ibrahimovic',
          company: 'LA Galaxy',
          status: 'Active',
          lastUpdated: '03/09/2018',
          notes: `I am 'Zlatan'`,
        },
      ],
      select_all: false,
      selected: [],
      hideModal: false,
      toggleClass: false,
      toggleClassStatus: false,
      status: [],
      select_dropdown: false,
      selectAllDrop: [],
    };
  },

  provide() {
    return {
      addResource: this.addResource,
      showUser: this.showUser,
    };
  },

  methods: {
    select() {
      this.selected = [];
      if (!this.select_all) {
        for (let i in this.data) {
          this.selected.push(this.data[i].id);
        }
      }
    },

    dropdownSelectAll() {
      this.selectAllDrop = [];
      if (!this.select_dropdown) {
        for (let i in this.data) {
          this.selectAllDrop.push(this.data[i].id);
        }
      }
    },

    sortStatus() {
      if (this.toggleClassStatus === false) {
        this.data.sort((a, b) =>
          a.status > b.status ? 1 : b.status > a.status ? -1 : 0
        );
      } else {
        this.data.sort((a, b) =>
          a.status < b.status ? 1 : b.status < a.status ? -1 : 0
        );
      }
    },

    deleteRow(index) {
      this.data.splice(index, 1);
    },

    showUser() {
      this.hideModal = !this.hideModal;
    },

    showClass() {
      this.toggleClass = !this.toggleClass;
      this.toggleClassStatus = false;
    },

    showClassStatus() {
      this.toggleClassStatus = !this.toggleClassStatus;
      this.toggleClass = false;
    },

    addResource(name, company, status, notes) {
      const newResource = {
        id: new Date().toISOString(),
        name: name,
        company: company,
        status: status,
        notes: notes,
      };
      this.data.push(newResource);
      this.showUser();
    },
  },

  mounted() {
    let user = localStorage.getItem('user-info');

    if (!user) {
      this.$router.push('/login');
    }
  },
};
</script>

<style scoped>
* {
  font-family: sans-serif; /* Change your font family */
}

.main-heading {
  border-bottom: 3px solid #e4e1e1;
  margin-bottom: 20px;
}

.main-heading div {
  display: flex;
  gap: 2.5rem;
  margin-bottom: 20px;
}
.main-heading h1 {
  color: #757474;
}

.bi {
  cursor: pointer;
}

.d-page {
  display: flex;
  width: 100%;
  margin-top: 1.2rem;
  gap: 2.5rem;
}
.ds-description {
  width: 70%;
  margin: 10vh auto;
}

.content-table {
  width: 100%;
  border-collapse: collapse;
  margin: 10px 0;
  font-size: 0.9em;
  border-radius: 5px 5px 0 0;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

.content-table thead tr {
  text-align: left;
  font-weight: bold;
}

.content-table th,
.content-table td {
  padding: 12px 15px;
}

.content-table tbody tr {
  border-bottom: 1px solid #dddddd;
}

.content-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.content-table tbody tr:last-of-type {
  border-bottom: 2px solid #009879;
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

body {
  background-color: blueviolet;
}
input {
  outline: none;
  border: none;
}

.flexbox {
  display: flex;
  gap: 25px;
}

a {
  text-decoration: none;
  color: #379937;
}

body {
  margin: 40px;
}

.dropdown {
  position: relative;
  font-size: 14px;
  color: #333;
}
.dropdown .dropdown-list {
  padding: 12px;
  background: #fff;
  position: absolute;
  top: 30px;
  left: 2px;
  right: 2px;
  box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.15);
  transform-origin: 50% 0;
  transform: scale(1, 0);
  transition: transform 0.15s ease-in-out 0.15s;
  max-height: 66vh;
  overflow-y: scroll;
  width: max-content;
}
.dropdown .dropdown-option {
  display: block;
  padding: 8px 12px;
  opacity: 0;
  transition: opacity 0.15s ease-in-out;
}
.dropdown .dropdown-label {
  display: block;
  height: 30px;
  background: #fff;
  border: 1px solid #ccc;
  padding: 6px 12px;
  line-height: 1;
  cursor: pointer;
}

.dropdown .dropdown-label:before {
  content: '▼';
  float: right;
}
.dropdown.on .dropdown-list {
  transform: scale(1, 1);
  transition-delay: 0s;
}
.dropdown.on .dropdown-list .dropdown-option {
  opacity: 1;
  transition-delay: 0.2s;
}
.dropdown.on .dropdown-label:before {
  content: '▲';
}
.dropdown [type='checkbox'] {
  position: relative;
  top: -1px;
  margin-right: 4px;
}

@media (max-width: 768px) {
  .content-table thead {
    display: none;
  }
  .content-table,
  .content-table tbody,
  .content-table tr,
  .content-table td {
    display: block;
    width: 100%;
  }
  .content-table tr {
    margin-bottom: 0;
  }
  .content-table tbody tr td {
    text-align: right;
    padding-left: 50%;
    position: relative;
  }
  .content-table td:before {
    content: attr(data-label);
    position: absolute;
    left: 0;
    width: 50%;
    padding-left: 15px;
    font-weight: 600;
    font-size: 14px;
    text-align: left;
  }
}
</style>
