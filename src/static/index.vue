<template>
  <div class="home-container">
    <a-layout-header class="app-header">
      <div class="header-container">
        <div class="logo">
          <i class="fa fa-hotel"></i>
          <span class="logo-text">知迹酒店管理系统</span>
        </div>

        <div class="header-right">
          <a-badge count="5" class="notification-badge">
            <a-button type="text" shape="circle" class="icon-btn">
              <template #icon><i class="far fa-bell"></i></template>
            </a-button>
          </a-badge>

          <a-dropdown>
            <div class="user-profile">
              <a-avatar :size="36" style="background-color: #1890ff">
                <i class="fa fa-user"></i>
              </a-avatar>
              <div class="user-info">
                <div class="user-name">张经理</div>
                <div class="user-role">管理员</div>
              </div>
              <i class="fa fa-chevron-down"></i>
            </div>
            <template #overlay>
              <a-menu>
                <a-menu-item key="profile">
                  <i class="fa fa-user-circle"></i> 个人中心
                </a-menu-item>
                <a-menu-item key="settings">
                  <i class="fa fa-cog"></i> 系统设置
                </a-menu-item>
                <a-menu-divider />
                <a-menu-item key="logout">
                  <i class="fa fa-sign-out-alt"></i> 退出登录
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </div>
    </a-layout-header>

    <!-- 主内容区 -->
    <a-layout-content class="app-content">
      <div class="content-container">
       
        <!-- 数据概览卡片 -->
        <div class="stats-section">
          <a-row :gutter="16">
            <a-col :span="6">
              <a-card class="stats-card" hoverable>
                <div class="card-content">
                  <div class="icon-wrapper" style="background-color: #e6f7ff">
                    <i class="fa fa-bed" style="color: #1890ff"></i>
                  </div>
                  <div class="stats-info">
                    <div class="stats-number">86</div>
                    <div class="stats-title">可用客房</div>
                  </div>
                </div>
              </a-card>
            </a-col>

            <a-col :span="6">
              <a-card class="stats-card" hoverable>
                <div class="card-content">
                  <div class="icon-wrapper" style="background-color: #f6ffed">
                    <i class="fa fa-user-check" style="color: #52c41a"></i>
                  </div>
                  <div class="stats-info">
                    <div class="stats-number">42</div>
                    <div class="stats-title">今日入住</div>
                  </div>
                </div>
              </a-card>
            </a-col>

            <a-col :span="6">
              <a-card class="stats-card" hoverable>
                <div class="card-content">
                  <div class="icon-wrapper" style="background-color: #fff7e6">
                    <i class="fa fa-door-open" style="color: #fa8c16"></i>
                  </div>
                  <div class="stats-info">
                    <div class="stats-number">28</div>
                    <div class="stats-title">今日退房</div>
                  </div>
                </div>
              </a-card>
            </a-col>

            <a-col :span="6">
              <a-card class="stats-card" hoverable>
                <div class="card-content">
                  <div class="icon-wrapper" style="background-color: #fff0f6">
                    <i class="fa fa-dollar-sign" style="color: #eb2f96"></i>
                  </div>
                  <div class="stats-info">
                    <div class="stats-number">¥86,450</div>
                    <div class="stats-title">今日收入</div>
                  </div>
                </div>
              </a-card>
            </a-col>
          </a-row>
        </div>

        <!-- 功能区域 -->
        <div class="action-section">
          <a-row :gutter="16">
            <a-col :span="16">
              <a-card title="快速操作" class="dashboard-card">
                <a-row :gutter="[16, 16]">
                  <a-col :span="6">
                    <a-button class="action-btn">
                      <i class="fa fa-user-plus"></i>
                      <span>登记入住</span>
                    </a-button>
                  </a-col>
                  <a-col :span="6">
                    <a-button class="action-btn">
                      <i class="fa fa-key"></i>
                      <span>客房分配</span>
                    </a-button>
                  </a-col>
                  <a-col :span="6">
                    <a-button class="action-btn">
                      <i class="fa fa-receipt"></i>
                      <span>结账退房</span>
                    </a-button>
                  </a-col>
                  <a-col :span="6">
                    <a-button class="action-btn">
                      <i class="fa fa-calendar-plus"></i>
                      <span>预订管理</span>
                    </a-button>
                  </a-col>
                  <a-col :span="6">
                    <a-button class="action-btn">
                      <i class="fa fa-bell"></i>
                      <span>客房服务</span>
                    </a-button>
                  </a-col>
                  <a-col :span="6">
                    <a-button class="action-btn">
                      <i class="fa fa-utensils"></i>
                      <span>餐饮订单</span>
                    </a-button>
                  </a-col>
                  <a-col :span="6">
                    <a-button class="action-btn">
                      <i class="fa fa-file-invoice-dollar"></i>
                      <span>账单管理</span>
                    </a-button>
                  </a-col>
                  <a-col :span="6">
                    <a-button class="action-btn">
                      <i class="fa fa-chart-line"></i>
                      <span>经营报表</span>
                    </a-button>
                  </a-col>
                </a-row>
              </a-card>

              <a-card
                title="最新订单"
                class="dashboard-card"
                style="margin-top: 16px"
              >
                <a-table
                  :columns="orderColumns"
                  :data-source="orderData"
                  :pagination="false"
                >
                  <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'status'">
                      <a-tag :color="getStatusColor(record.status)">
                        {{ record.status }}
                      </a-tag>
                    </template>
                    <template v-else-if="column.key === 'action'">
                      <a-button type="link" size="small">查看</a-button>
                    </template>
                  </template>
                </a-table>
               
              </a-card>
            </a-col>

            <a-col :span="8">
              <a-card title="客房状态" class="dashboard-card">
                <div class="room-status">
                  <div class="status-item">
                    <div class="status-indicator available"></div>
                    <div class="status-info">
                      <div class="status-count">86</div>
                      <div class="status-title">可用客房</div>
                    </div>
                  </div>
                  <div class="status-item">
                    <div class="status-indicator occupied"></div>
                    <div class="status-info">
                      <div class="status-count">142</div>
                      <div class="status-title">已入住</div>
                    </div>
                  </div>
                  <div class="status-item">
                    <div class="status-indicator cleaning"></div>
                    <div class="status-info">
                      <div class="status-count">12</div>
                      <div class="status-title">清洁中</div>
                    </div>
                  </div>
                  <div class="status-item">
                    <div class="status-indicator maintenance"></div>
                    <div class="status-info">
                      <div class="status-count">5</div>
                      <div class="status-title">维护中</div>
                    </div>
                  </div>
                </div>

                <div class="room-chart">
                  <div class="chart-placeholder">
                    <i class="fa fa-chart-pie"></i>
                    <p>客房状态分布图</p>
                  </div>
                </div>

                <div class="footer-content">
                  <div>© 2025 知迹酒店管理系统</div>
                  <div class="footer-links">
                    <a href="#">帮助中心</a>
                    <a href="#">隐私政策</a>
                    <a href="#">服务条款</a>
                    <a href="#">联系我们</a>
                  </div>
                </div>
              </a-card>
            </a-col>
          </a-row>
        </div>
      </div>
    </a-layout-content>
  </div>
</template>

<script setup> 

const orderColumns = [
  {
    title: "订单号",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "客户姓名",
    dataIndex: "customer",
    key: "customer",
  },
  {
    title: "房型",
    dataIndex: "roomType",
    key: "roomType",
  },
  {
    title: "入住日期",
    dataIndex: "checkIn",
    key: "checkIn",
  },
  {
    title: "状态",
    key: "status",
  },
  {
    title: "操作",
    key: "action",
  },
];

const orderData = [
  {
    id: "ORD20230622001",
    customer: "张先生",
    roomType: "豪华大床房",
    checkIn: "2023-06-22",
    status: "已入住",
  },
  {
    id: "ORD20230622002",
    customer: "李女士",
    roomType: "行政套房",
    checkIn: "2023-06-22",
    status: "待付款",
  },
  {
    id: "ORD20230622003",
    customer: "王先生",
    roomType: "标准双床房",
    checkIn: "2023-06-23",
    status: "已确认",
  },
  {
    id: "ORD20230622004",
    customer: "刘女士",
    roomType: "豪华海景房",
    checkIn: "2023-06-23",
    status: "已取消",
  },
  {
    id: "ORD20230622005",
    customer: "陈先生",
    roomType: "总统套房",
    checkIn: "2023-06-24",
    status: "已确认",
  },
];

// 根据状态获取标签颜色
const getStatusColor = (status) => {
  switch (status) {
    case "已入住":
      return "green";
    case "已确认":
      return "blue";
    case "待付款":
      return "orange";
    case "已取消":
      return "red";
    default:
      return "default";
  }
};
</script>

<style lang="scss">
.app-header {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: 64px;
  line-height: 64px;
  padding: 0 16px;
  position: sticky;
  width: 100%;
  top: 0;
  z-index: 100;

  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;

    .logo {
      display: flex;
      align-items: center;
      font-size: 18px;
      font-weight: 700;
      color: #333;

      i {
        font-size: 24px;
        color: #1890ff;
        margin-right: 12px;
      }

      .logo-text {
        background: linear-gradient(90deg, #1890ff, #096dd9);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }

    .header-right {
      display: flex;
      align-items: center;

      .notification-badge {
        margin-right: 16px;

        .icon-btn {
          font-size: 18px;
          color: #666;
        }
      }

      .user-profile {
        display: flex;
        align-items: center;
        cursor: pointer;
        padding: 4px 8px;
        border-radius: 4px;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }

        .user-info {
          margin: 0 12px;

          .user-name {
            font-weight: 500;
            line-height: 1.2;
          }

          .user-role {
            font-size: 12px;
            color: #666;
            line-height: 1.2;
          }
        }

        i {
          color: #666;
          font-size: 12px;
        }
      }
    }
  }
}

.app-content {
  flex: 1;
  padding: 16px;

  .content-container {
    // max-width: 1400px;
    margin: 0 auto;
  }

  .welcome-section {
    margin-bottom: 16px;

    h1 {
      font-size: 28px;
      font-weight: 600;
      margin-bottom: 8px;
      color: #333;
    }

    p {
      font-size: 16px;
      color: #666;

      .highlight {
        color: #1890ff;
        font-weight: 600;
        margin: 0 4px;
      }
    }
  }

  .stats-section {
    margin-bottom: 16px;

    .stats-card {
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
      border: none;

      .card-content {
        display: flex;
        align-items: center;

        .icon-wrapper {
          width: 56px;
          height: 56px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 16px;

          i {
            font-size: 24px;
          }
        }

        .stats-info {
          .stats-number {
            font-size: 24px;
            font-weight: 600;
            line-height: 1.2;
          }

          .stats-title {
            color: #666;
            font-size: 14px;
          }
        }
      }
    }
  }

  .dashboard-card {
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
    border: none;
    margin-bottom: 16px;

    .ant-card-head {
      border-bottom: 1px solid #e8e8e8;

      .ant-card-head-title {
        font-weight: 600;
      }
    }
  }

  .action-btn {
    height: 80px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    border: 1px dashed #e8e8e8;
    background: rgba(#1890ff, 0.03);
    transition: all 0.3s;

    i {
      font-size: 24px;
      margin-bottom: 8px;
      color: #1890ff;
    }

    span {
      font-size: 14px;
    }

    &:hover {
      border-color: #1890ff;
      background: rgba(#1890ff, 0.1);
      transform: translateY(-2px);
    }
  }

  .room-status {
    .status-item {
      display: flex;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid #e8e8e8;

      &:last-child {
        border-bottom: none;
      }

      .status-indicator {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        margin-right: 16px;

        &.available {
          background: #52c41a;
        }

        &.occupied {
          background: #1890ff;
        }

        &.cleaning {
          background: #faad14;
        }

        &.maintenance {
          background: #f5222d;
        }
      }

      .status-info {
        flex: 1;

        .status-count {
          font-size: 18px;
          font-weight: 600;
        }

        .status-title {
          color: #666;
          font-size: 14px;
        }
      }
    }
  }

  .room-chart {
    margin-top: 16px;
    height: 280px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(#1890ff, 0.02);
    border-radius: 8px;
    border: 1px dashed #e8e8e8;

    .chart-placeholder {
      text-align: center;
      color: #666;

      i {
        font-size: 48px;
        margin-bottom: 12px;
        color: rgba(#666, 0.3);
      }

      p {
        margin: 0;
      }
    }
  }

  .view-all {
    text-align: center;
    padding-top: 16px;
    border-top: 1px solid #e8e8e8;
    margin-top: 16px;
  }
}

.app-footer {
  background: #fff;
  text-align: center;
  padding: 16px 16px;
  border-top: 1px solid #e8e8e8;

  
}

.footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    color: #666;
    padding: 16px;
    padding-bottom: 0;
    .footer-links {
      a {
        color: #666;
        margin-left: 16px;
        &:hover {
          color: #1890ff;
        }
      }
    }
  }

// 响应式调整
@media (max-width: 992px) {
  .app-content {
    padding: 16px;
  }

  .stats-section {
    .ant-col {
      margin-bottom: 16px;
    }
  }
}

@media (max-width: 768px) {
  .app-header {
    padding: 0 16px;

    .logo {
      .logo-text {
        display: none;
      }
    }
  }

  .welcome-section {
    h1 {
      font-size: 22px;
    }
  }
}
</style>
