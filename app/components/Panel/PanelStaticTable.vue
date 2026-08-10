<script setup>
import { PhArrowsDownUp, PhCaretLeft, PhCaretRight } from "@phosphor-icons/vue";

const props = defineProps({
  data: { type: Array, default: () => [] },
  columnConfig: { type: Array, default: () => [] },
  searchField: { type: String, default: "name" },
  searchPlaceholder: { type: String, default: "" },
});

const searchQuery = ref("");
const sortBy = ref("");
const sortDirection = ref("asc");
const currentPage = ref(1);
const perPage = ref(10);

const sortedData = computed(() => {
  if (sortBy.value === "") {
    return [...props.data].filter((item) => {
      const value = getNestedValue(item, props.searchField);
      return String(value ?? "")
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase());
    });
  }

  return [...props.data]
    .filter((item) => {
      const value = getNestedValue(item, props.searchField);
      return String(value ?? "")
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase());
    })
    .sort((a, b) => {
      const valueA = a[sortBy.value];
      const valueB = b[sortBy.value];

      if (valueA < valueB) {
        return sortDirection.value === "asc" ? -1 : 1;
      }

      if (valueA > valueB) {
        return sortDirection.value === "asc" ? 1 : -1;
      }

      return 0;
    });
});

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;

  return sortedData.value.slice(start, start + perPage.value);
});

const totalPages = computed(() => {
  return Math.ceil(sortedData.value.length / perPage.value);
});

const paginationItem = computed(() => {
  const current = currentPage.value;
  const total = totalPages.value;

  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  if (current <= 3) {
    return [1, 2, 3, "...", total];
  }

  if (current >= total - 2) {
    return [1, "...", total - 2, total - 1, total];
  }

  return [1, "...", current, "...", total];
});

const getNestedValue = (obj, path) => {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
};

const handleSort = (field) => {
  if (field === "aksi") return;

  if (sortBy.value === field) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    sortBy.value = field;
    sortDirection.value = "asc";
  }
};

const jumpToPage = (number) => {
  if (typeof number === "number") {
    currentPage.value = number;
  }
};
</script>

<template>
  <div id="static-table">
    <div class="table-wrapper">
      <div class="header-wrapper">
        <InputSearch v-model="searchQuery" :placeholder="searchPlaceholder" />
      </div>

      <div v-if="paginatedData.length" class="scroll-container">
        <table>
          <thead>
            <tr>
              <th
                v-for="column in columnConfig"
                :key="column.field"
                @click="handleSort(column.field)"
              >
                <div class="column-header">
                  <div class="text truncate label">{{ column.label }}</div>
                  <PhArrowsDownUp
                    size="18"
                    :color="sortBy === column.field ? '#007c80' : '#1F2937'"
                  />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(datum, index) in paginatedData" :key="datum.id">
              <td
                v-for="column in columnConfig"
                :key="column.field"
                :class="[{ odd: (index + 1) % 2 !== 0 }]"
              >
                <div class="column-body">
                  <template v-if="column.custom">
                    <slot
                      :name="`cell-${column.field}`"
                      :item="datum[column.field]"
                    />
                  </template>
                  <template v-else>
                    <div v-if="column.formatter" class="text truncate">
                      {{
                        column.formatter(getNestedValue(datum, column.field))
                      }}
                    </div>
                    <div v-else class="text truncate">
                      {{ getNestedValue(datum, column.field) }}
                    </div>
                  </template>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <InfoState
        v-else
        img="/illustration/empty-box.svg"
        message="Data Belum Tersedia"
      />

      <div v-if="data.length > 10 && paginatedData.length" class="paginator">
        <PhCaretLeft
          v-show="currentPage > 1"
          size="18"
          color="#007c80"
          @click="currentPage--"
        />

        <div class="page-number">
          <div
            class="button-number"
            v-for="(number, i) in paginationItem"
            @click="jumpToPage(number)"
          >
            <span :class="[{ active: number === currentPage }]">
              {{ number }}
            </span>
          </div>
        </div>
        <PhCaretRight
          v-show="currentPage < totalPages"
          size="18"
          color="#007c80"
          @click="currentPage++"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

#static-table {
  .table-wrapper {
    width: 100%;
    border-radius: 10px;
    border: 1px solid #e5e7eb;
    background-color: white;
    padding-bottom: 16px;

    .header-wrapper {
      padding: 16px;
    }

    .scroll-container {
      width: 100%;
      overflow-y: auto;

      &::-webkit-scrollbar {
        height: 2px;
      }

      &::-webkit-scrollbar-track {
        background: var(--sb-track-color);
        border-radius: 10px;
      }

      &::-webkit-scrollbar-thumb {
        background: var(--sb-thumb-color);
        border-radius: 10px;
      }

      table {
        border-collapse: collapse;
        min-width: 100%;
        width: fit-content;

        thead,
        tbody {
          th,
          td {
            border-right: 1px solid #e5e7eb;
            min-width: 200px;
          }
        }

        thead {
          tr {
            border-bottom: 1px solid #e5e7eb;
            min-width: 200px;
          }
        }

        tbody {
          .odd {
            background-color: #f9fafb;
          }
        }

        .column-header,
        .column-body {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 4px 8px;

          .text {
            color: #1f2937;
            line-clamp: 1;
            -webkit-line-clamp: 1;
            /* Regular/Caption Medium */
            font-size: 11px;
            font-style: normal;
            font-weight: 424;
            line-height: 16px; /* 145.455% */
            letter-spacing: 0.05px;

            &.label {
              font-weight: 580;
            }
          }
        }
      }
    }

    .paginator {
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: center;
      gap: 20px;
      padding: 16px 16px 0 16px;

      button {
        width: 28px;
        height: 28px;
      }

      .page-number {
        display: flex;
        align-items: center;
        gap: 12px;

        .button-number {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;

          span {
            color: #4b5563;
            font-size: 14px;
            font-style: normal;
            font-weight: 424;
            line-height: 22px; /* 157.143% */
            letter-spacing: 0.02px;

            &.active {
              color: #005e4e;
              text-decoration: underline;
              font-weight: 580;
            }
          }
        }
      }
    }
  }
}
</style>
