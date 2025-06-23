<style lang="scss">
/* 顶部导航栏样式 */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  margin-bottom: 30px;
  position: sticky;
  top: 20px;
  z-index: 100;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
}

.logo-text {
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
}

.logo-subtext {
  font-size: 14px;
  color: #64748b;
  margin-left: 8px;
  font-weight: 500;
}

.nav-items {
  display: flex;
  gap: 25px;
}

.nav-item {
  font-size: 16px;
  font-weight: 500;
  color: #64748b;
  padding: 8px 15px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
}

.nav-item:hover,
.nav-item.active {
  background: #f1f5f9;
  color: #4f46e5;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #e0e7ff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4f46e5;
  font-weight: 600;
}

.notification {
  position: relative;
  font-size: 20px;
  color: #64748b;
  cursor: pointer;
}

.notification-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  width: 18px;
  height: 18px;
  background: #ef4444;
  color: white;
  border-radius: 50%;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 主内容区样式 */
.dashboard {
  display: flex;
  gap: 30px;
}

.sidebar {
  flex: 0 0 280px;
  background: white;
  border-radius: 16px;
  padding: 25px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  height: fit-content;
}

.sidebar-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #1e293b;
}

.sidebar-title i {
  color: #4f46e5;
}

.sidebar-section {
  margin-bottom: 30px;
}

.sidebar-item {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  border-radius: 10px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: all 0.3s;
  gap: 12px;
}

.sidebar-item:hover {
  background: #f1f5f9;
}

.sidebar-item.active {
  background: #e0e7ff;
  color: #4f46e5;
  font-weight: 500;
}

.sidebar-item i {
  font-size: 18px;
  width: 24px;
  text-align: center;
}

/* 主内容区样式 */
.main-content {
  flex: 1;
}

.welcome-card {
  background: white;
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.welcome-text h1 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #1e293b;
}

.welcome-text p {
  color: #64748b;
  max-width: 600px;
  line-height: 1.6;
}

.stats {
  display: flex;
  gap: 15px;
}

.stat-item {
  background: #f1f5f9;
  border-radius: 12px;
  padding: 15px 20px;
  min-width: 150px;
  text-align: center;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: #4f46e5;
}

.stat-label {
  font-size: 14px;
  color: #64748b;
}

/* 模块网格样式 */
.section-title {
  font-size: 22px;
  font-weight: 700;
  margin: 40px 0 20px;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 10px;
}

.section-title i {
  color: #4f46e5;
}

.modules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
  margin-bottom: 50px;
}

.module-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
  cursor: pointer;
}

.module-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.module-header {
  padding: 25px 25px 20px;
  display: flex;
  align-items: center;
  gap: 15px;
}

.module-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.pms .module-icon {
  background: rgba(79, 70, 229, 0.1);
  color: #4f46e5;
}

.ems .module-icon {
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
}

.mall .module-icon {
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
}

.cms .module-icon {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.system .module-icon {
  background: rgba(139, 92, 246, 0.1);
  color: #8b5cf6;
}

.module-title {
  font-size: 18px;
  font-weight: 600;
}

.module-content {
  padding: 0 25px 25px;
}

.module-desc {
  color: #64748b;
  margin-bottom: 20px;
  line-height: 1.6;
  font-size: 14px;
}

.module-stats {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #94a3b8;
  border-top: 1px solid #f1f5f9;
  padding-top: 15px;
}

.stat {
  display: flex;
  align-items: center;
  gap: 5px;
}

/* 最近访问模块 */
.recent-modules {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.recent-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.03);
  transition: all 0.3s;
  cursor: pointer;
}

.recent-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.recent-icon {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.recent-info {
  flex: 1;
}

.recent-name {
  font-weight: 600;
  margin-bottom: 5px;
}

.recent-time {
  font-size: 13px;
  color: #94a3b8;
}

/* 页脚样式 */
.footer {
  text-align: center;
  padding: 30px 0;
  color: #64748b;
  font-size: 14px;
  border-top: 1px solid #e2e8f0;
  margin-top: 20px;
}

/* 响应式调整 */
@media (max-width: 1200px) {
  .dashboard {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .navbar {
    flex-wrap: wrap;
    gap: 15px;
  }

  .nav-items {
    order: 3;
    width: 100%;
    justify-content: center;
  }

  .welcome-card {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }

  .stats {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 576px) {
  .stats {
    flex-direction: column;
  }

  .modules-grid {
    grid-template-columns: 1fr;
  }
}

.nav-container{

  padding: 16px;
}
</style>

<template>
  <div class="nav-container">

    <!-- 顶部导航栏 -->
    <div class="navbar">
      <div class="logo">
        <div class="logo-icon">
          
          <i class="fa fa-address-book-o"></i>
        </div>
        <div>
          <span class="logo-text">知迹智慧管理平台</span>
          <span class="logo-subtext">Zhiji Management Platform</span>
        </div>
      </div>

      <div class="nav-items">
        <div class="nav-item active" @click="activeNav = 'dashboard'">
          <i class="fa fa-home"></i> 首页
        </div>
        <div class="nav-item" @click="activeNav = 'analytics'">
          <i class="fa fa-chart-line"></i> 分析
        </div>
        <div class="nav-item" @click="activeNav = 'reports'">
          <i class="fa fa-file-alt"></i> 报表
        </div>
        <div class="nav-item" @click="activeNav = 'settings'">
          <i class="fa fa-cog"></i> 设置
        </div>
      </div>

      <div class="user-info">
        <div class="notification">
          <i class="fa fa-bell"></i>
          <div class="notification-badge">5</div>
        </div>
        <div class="user-avatar">AD</div>
        <div>
          <div style="font-weight: 600;">Admin</div>
          <div style="font-size: 13px; color: #64748b;">系统管理员</div>
        </div>
      </div>
    </div>

    <!-- 主内容区 -->
    <div class="dashboard">
      <!-- 左侧边栏 -->
      <div class="sidebar">
        <div class="sidebar-section">
          <div class="sidebar-title">
            <i class="fa fa-th-large"></i> 主要功能
          </div>
          <div class="sidebar-item active">
            <i class="fa fa-home"></i>
            <span>控制台</span>
          </div>
          <div class="sidebar-item">
            <i class="fa fa-tasks"></i>
            <span>任务管理</span>
          </div>
          <div class="sidebar-item">
            <i class="fa fa-calendar-alt"></i>
            <span>日程安排</span>
          </div>
        </div>

        <div class="sidebar-section">
          <div class="sidebar-title">
            <i class="fa fa-cog"></i> 系统设置
          </div>
          <div class="sidebar-item">
            <i class="fa fa-user"></i>
            <span>用户管理</span>
          </div>
          <div class="sidebar-item">
            <i class="fa fa-shield-alt"></i>
            <span>权限设置</span>
          </div>
          <div class="sidebar-item">
            <i class="fa fa-database"></i>
            <span>数据备份</span>
          </div>
        </div>

        <div class="sidebar-section">
          <div class="sidebar-title">
            <i class="fa fa-chart-pie"></i> 统计分析
          </div>
          <div class="sidebar-item">
            <i class="fa fa-chart-bar"></i>
            <span>业务报表</span>
          </div>
          <div class="sidebar-item">
            <i class="fa fa-chart-line"></i>
            <span>趋势分析</span>
          </div>
          <div class="sidebar-item">
            <i class="fa fa-file-export"></i>
            <span>数据导出</span>
          </div>
        </div>
      </div>

      <!-- 主内容区 -->
      <div class="main-content">
        <!-- 欢迎卡片 -->
        <div class="welcome-card">
          <div class="welcome-text">
            <h1>欢迎回来，管理员！</h1>
            <p>您有3个待处理任务，5个系统通知需要查看。上次登录时间为2023年10月15日 14:30。</p>
          </div>
          <div class="stats">
            <div class="stat-item">
              <div class="stat-value">12</div>
              <div class="stat-label">待处理任务</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">5</div>
              <div class="stat-label">系统通知</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">98%</div>
              <div class="stat-label">系统健康度</div>
            </div>
          </div>
        </div>

        <!-- 最近访问模块 -->
        <div class="section-title">
          <i class="fa fa-history"></i>
          <span>最近访问</span>
        </div>
        <div class="recent-modules">
          <div class="recent-card" v-for="module in recentModules" :key="module.id"
            @click="handleModuleClick(module.id)">
            <div class="recent-icon" :class="module.id">
              <i :class="`fa ${module.icon}`"></i>
            </div>
            <div class="recent-info">
              <div class="recent-name">{{ module.name }}</div>
              <div class="recent-time">{{ module.time }}</div>
            </div>
          </div>
        </div>

        <!-- 系统模块 -->
        <div class="section-title">
          <i class="fa fa-th-large"></i>
          <span>系统模块</span>
        </div>
        <div class="modules-grid">
          <div class="module-card" :class="module.id" v-for="module in modules" :key="module.id"
            @click="handleModuleClick(module.id)">
            <div class="module-header">
              <div class="module-icon">
                <i :class="`fa ${module.icon}`"></i>
              </div>
              <div class="module-title">{{ module.name }}</div>
            </div>
            <div class="module-content">
              <div class="module-desc">{{ module.description }}</div>
              <div class="module-stats">
                <div class="stat">
                  <i class="fa fa-tasks"></i>
                  <span>{{ module.stats.tasks }} 任务</span>
                </div>
                <div class="stat">
                  <i class="fa fa-sync-alt"></i>
                  <span>{{ module.stats.updates }} 更新</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>



<script setup>
import { ref } from 'vue'
// 当前激活的导航项
const activeNav = ref('dashboard');

// 模块数据
const modules = ref([
  {
    id: 'pms',
    name: '物业管理系统 (PMS)',
    icon: 'fa-building',
    description: '全面管理物业资源、租户信息、收费账单和维修工单，提升物业管理效率和服务质量。',
    stats: { tasks: 12, updates: 3 }
  },
  {
    id: 'ems',
    name: '设备管理系统 (EMS)',
    icon: 'fa-microchip',
    description: '监控设备运行状态，管理维护计划，优化设备使用效率，降低故障率。',
    stats: { tasks: 8, updates: 5 }
  },
  {
    id: 'mall',
    name: '商城系统 (MALL)',
    icon: 'fa-shopping-cart',
    description: '一站式电商解决方案，包含商品管理、订单处理、营销活动和客户服务功能。',
    stats: { tasks: 24, updates: 7 }
  },
  {
    id: 'cms',
    name: '内容管理系统 (CMS)',
    icon: 'fa-file-alt',
    description: '创建、管理和发布数字内容，支持多用户协作和内容版本控制。',
    stats: { tasks: 5, updates: 2 }
  },
  {
    id: 'system',
    name: '系统管理 (SYSTEM)',
    icon: 'fa-cog',
    description: '系统配置、用户权限管理、日志审计和系统监控，确保系统安全稳定运行。',
    stats: { tasks: 3, updates: 1 }
  }
]);

// 最近访问的模块
const recentModules = ref([
  { id: 'pms', name: '租户管理', icon: 'fa-users', time: '2小时前' },
  { id: 'mall', name: '订单处理', icon: 'fa-box', time: '今天 09:30' },
  { id: 'ems', name: '设备监控', icon: 'fa-tachometer-alt', time: '昨天 17:45' },
  { id: 'cms', name: '文章编辑', icon: 'fa-edit', time: '昨天 14:20' }
]);

// 处理模块点击
const handleModuleClick = (moduleId) => {
  console.log(`进入模块: ${moduleId}`);
  // 在实际应用中，这里会进行路由跳转
};
</script>
