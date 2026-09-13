<template>
  <div class="tabs-bar">
    <div
      v-for="tab in tabsStore.tabs"
      :key="tab.fullPath"
      class="tab-item"
      :class="{ active: tabsStore.activeTab === tab.fullPath }"
      @click="switchTab(tab)"
    >
      <!-- @contextmenu.prevent="openMenu($event, tab)" -->
      <span>{{ tab.title }}</span>
      <!--  固定标签不显示关闭按钮 -->
      <span
        v-if="!tab.affix"
        class="close-btn"
        @click.stop="closeTab(tab.fullPath)"
        >×</span
      >
      <!-- 固定标签显示一个小钉子图标 -->
      <span v-else class="affix-icon">📌</span>
    </div>
    <div class="tabs-actions">
      <el-dropdown @command="handleCommand">
        <span class="more-btn">⋮</span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="closeOther">关闭其他</el-dropdown-item>
            <el-dropdown-item command="closeAll">关闭所有</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useTabsStore } from "@/stores/tabs";
import type { TabItem } from "@/types/index";

const router = useRouter();
const tabsStore = useTabsStore();

function switchTab(tab: TabItem) {
  tabsStore.activeTab = tab.path;
  router.push({ path: tab.path, query: tab.query });
}

function closeTab(path: string) {
  tabsStore.removeTab(path);
}

function handleCommand(command: string) {
  const active = tabsStore.activeTab;
  if (command === "closeOther") {
    tabsStore.closeOtherTabs(active);
  } else if (command === "closeAll") {
    tabsStore.closeAllTabs();
    router.push("/home");
  }
}
</script>

<style scoped>
.tabs-bar {
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 12px;
  background: #fff;
  border-bottom: 1px solid #e4e7ed;
  overflow: hidden;
}

.tabs-wrapper {
  display: flex;
  flex: 1;
  overflow-x: auto;
  gap: 2px;
}

.tab-item {
  display: flex;
  align-items: center;
  padding: 0 12px;
  height: 32px;
  font-size: 13px;
  color: #606266;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
  background: #f5f7fa;
  transition: all 0.2s;
}

.tab-item.active {
  background: #ebf5ff;
  color: #409eff;
}

.tab-item .close-btn {
  margin-left: 6px;
  font-size: 16px;
  line-height: 1;
  opacity: 0.6;
}

.tab-item .close-btn:hover {
  opacity: 1;
}

.tabs-actions {
  margin-left: 8px;
}

.more-btn {
  cursor: pointer;
  font-size: 18px;
  padding: 0 4px;
}
</style>
