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

    deleteRow(index) {
      this.data.splice(index, 1);
    },
    showUser() {
      this.hideModal = !this.hideModal;
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
