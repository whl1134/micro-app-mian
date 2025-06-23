<template>
  <div class="modern-room-status">
    <!-- 顶部控制栏 -->
    <div class="control-panel">
      <div class="panel-section">
        <h2 class="panel-title">阳光国际大酒店</h2>
        <div class="date-display">{{ currentDate }}</div>
      </div>
      
      <div class="panel-section">
        <div class="floor-navigation">
          <button 
            v-for="floor in floors" 
            :key="floor" 
            class="floor-btn"
            :class="{ active: currentFloor === floor }"
            @click="currentFloor = floor"
          >
            {{ floor }}F
          </button>
        </div>
      </div>
      
      <div class="panel-section">
        <div class="status-filters">
          <div 
            v-for="filter in statusFilters" 
            :key="filter.value"
            class="filter-item"
            :class="{ active: activeFilters.includes(filter.value) }"
            @click="toggleFilter(filter.value)"
          >
            <span class="filter-badge" :style="{ backgroundColor: filter.color }"></span>
            {{ filter.label }}
          </div>
        </div>
      </div>
    </div>

    <!-- 房态主视图 -->
    <div class="room-grid-container">
      <div class="room-grid">
        <div 
          v-for="room in filteredRooms" 
          :key="room.number"
          class="room-card"
          :class="[room.status, room.type]"
          @click="openRoomDetail(room)"
        >
          <div class="room-header">
            <span class="room-number">{{ room.number }}</span>
            <span class="room-type">{{ getRoomTypeLabel(room.type) }}</span>
          </div>
          
          <div class="room-status" :style="{ backgroundColor: getStatusColor(room.status) }">
            {{ getStatusLabel(room.status) }}
          </div>
          
          <div v-if="room.guest" class="guest-info">
            <div class="guest-name">{{ room.guest.name }}</div>
            <div class="stay-dates">
              <span>{{ formatDate(room.checkInDate) }}</span>
              <span>至</span>
              <span>{{ formatDate(room.checkOutDate) }}</span>
            </div>
          </div>
          
          <div v-if="room.cleanStatus" class="clean-indicator" :class="room.cleanStatus">
            <i class="icon" :class="getCleanIcon(room.cleanStatus)"></i>
          </div>
          
          <div v-if="room.maintenance" class="maintenance-indicator">
            <i class="icon tools"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- 房间详情侧边栏 -->
    <div class="room-detail-sidebar" :class="{ active: detailSidebarOpen }">
      <div class="sidebar-header">
        <h3>房间详情</h3>
        <button class="close-btn" @click="detailSidebarOpen = false">
          <i class="icon close"></i>
        </button>
      </div>
      
      <div v-if="selectedRoom" class="sidebar-content">
        <div class="room-info">
          <div class="info-item">
            <label>房间号</label>
            <div class="value">{{ selectedRoom.number }}</div>
          </div>
          
          <div class="info-item">
            <label>房型</label>
            <div class="value">{{ getRoomTypeLabel(selectedRoom.type) }}</div>
          </div>
          
          <div class="info-item">
            <label>状态</label>
            <div class="value status-tag" :style="{ 
              backgroundColor: getStatusColor(selectedRoom.status),
              color: getStatusTextColor(selectedRoom.status)
            }">
              {{ getStatusLabel(selectedRoom.status) }}
            </div>
          </div>
          
          <div v-if="selectedRoom.cleanStatus" class="info-item">
            <label>清洁状态</label>
            <div class="value clean-tag" :class="selectedRoom.cleanStatus">
              <i class="icon" :class="getCleanIcon(selectedRoom.cleanStatus)"></i>
              {{ getCleanLabel(selectedRoom.cleanStatus) }}
            </div>
          </div>
          
          <div v-if="selectedRoom.maintenance" class="info-item">
            <label>维修状态</label>
            <div class="value maintenance-tag">
              <i class="icon tools"></i>
              维修中
            </div>
          </div>
        </div>
        
        <div v-if="selectedRoom.guest" class="guest-details">
          <h4>客人信息</h4>
          <div class="info-item">
            <label>姓名</label>
            <div class="value">{{ selectedRoom.guest.name }}</div>
          </div>
          <div class="info-item">
            <label>电话</label>
            <div class="value">{{ selectedRoom.guest.phone }}</div>
          </div>
          <div class="info-item">
            <label>入住时间</label>
            <div class="value">{{ formatDateTime(selectedRoom.checkInDate) }}</div>
          </div>
          <div class="info-item">
            <label>离店时间</label>
            <div class="value">{{ formatDateTime(selectedRoom.checkOutDate) }}</div>
          </div>
        </div>
        
        <div class="action-buttons">
          <button 
            v-if="selectedRoom.status === 'vacant'" 
            class="action-btn primary"
            @click="checkIn(selectedRoom)"
          >
            <i class="icon key"></i>
            办理入住
          </button>
          
          <button 
            v-if="selectedRoom.status === 'occupied'" 
            class="action-btn warning"
            @click="checkOut(selectedRoom)"
          >
            <i class="icon exit"></i>
            办理退房
          </button>
          
          <button 
            v-if="selectedRoom.status !== 'reserved'" 
            class="action-btn secondary"
            @click="reserveRoom(selectedRoom)"
          >
            <i class="icon calendar"></i>
            预订房间
          </button>
          
          <button 
            class="action-btn"
            @click="toggleMaintenance(selectedRoom)"
          >
            <i class="icon tools"></i>
            {{ selectedRoom.maintenance ? '取消维修' : '设为维修' }}
          </button>
          
          <button 
            v-if="selectedRoom.cleanStatus"
            class="action-btn"
            @click="changeCleanStatus(selectedRoom)"
          >
            <i class="icon clean"></i>
            更新清洁状态
          </button>
        </div>
      </div>
    </div>
    
    <!-- 侧边栏遮罩 -->
    <div 
      class="sidebar-overlay" 
      :class="{ active: detailSidebarOpen }"
      @click="detailSidebarOpen = false"
    ></div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'

export default {
  setup() {
    // 基础数据
    const floors = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const currentFloor = ref(1)
    const detailSidebarOpen = ref(false)
    const selectedRoom = ref(null)
    
    // 状态过滤器
    const statusFilters = [
      { value: 'vacant', label: '空房', color: '#4CAF50' },
      { value: 'occupied', label: '已入住', color: '#F44336' },
      { value: 'reserved', label: '已预订', color: '#FF9800' },
      { value: 'maintenance', label: '维修', color: '#9E9E9E' }
    ]
    
    const activeFilters = ref(['vacant', 'occupied', 'reserved', 'maintenance'])
    
    // 房型配置
    const roomTypes = [
      { value: 'standard', label: '标准间', color: '#E3F2FD' },
      { value: 'deluxe', label: '豪华间', color: '#E8F5E9' },
      { value: 'suite', label: '套房', color: '#FFF3E0' },
      { value: 'family', label: '家庭房', color: '#F3E5F5' }
    ]
    
    // 房间数据
    const rooms = ref([])
    
    // 当前日期
    const currentDate = ref('')
    
    // 初始化数据
    onMounted(() => {
      updateCurrentDate()
      generateRoomData()
    })
    
    // 更新当前日期显示
    function updateCurrentDate() {
      const now = new Date()
      const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' }
      currentDate.value = now.toLocaleDateString('zh-CN', options)
    }
    
    // 生成模拟房间数据
    function generateRoomData() {
      const roomList = []
      const statusOptions = ['vacant', 'occupied', 'reserved']
      const cleanStatusOptions = ['clean', 'dirty', 'inspected']
      
      floors.forEach(floor => {
        for (let i = 1; i <= 20; i++) {
          const roomNumber = floor * 100 + i
          const roomType = roomTypes[Math.floor(Math.random() * roomTypes.length)].value
          const status = statusOptions[Math.floor(Math.random() * statusOptions.length)]
          const cleanStatus = Math.random() > 0.3 ? cleanStatusOptions[Math.floor(Math.random() * cleanStatusOptions.length)] : null
          const maintenance = Math.random() < 0.05
          
          let guest = null
          let checkInDate = null
          let checkOutDate = null
          
          if (status === 'occupied' || status === 'reserved') {
            guest = {
              name: getRandomChineseName(),
              phone: '1' + Math.floor(Math.random() * 9000000000 + 1000000000)
            }
            
            const today = new Date()
            checkInDate = status === 'occupied' 
              ? new Date(today.getTime() - Math.floor(Math.random() * 5) * 86400000)
              : new Date(today.getTime() + Math.floor(Math.random() * 7 + 1) * 86400000)
            
            checkOutDate = new Date(checkInDate.getTime() + (Math.floor(Math.random() * 5) + 1) * 86400000)
          }
          
          roomList.push({
            number: roomNumber,
            floor: floor,
            type: roomType,
            status: maintenance ? 'vacant' : status,
            cleanStatus: maintenance ? null : cleanStatus,
            maintenance: maintenance,
            guest: guest,
            checkInDate: checkInDate,
            checkOutDate: checkOutDate
          })
        }
      })
      
      rooms.value = roomList
    }
    
    // 获取随机中文名
    function getRandomChineseName() {
      const familyNames = ['张', '王', '李', '赵', '刘', '陈', '杨', '黄', '周', '吴']
      const givenNames = ['伟', '芳', '娜', '秀英', '敏', '静', '丽', '强', '磊', '军']
      return familyNames[Math.floor(Math.random() * familyNames.length)] + 
             givenNames[Math.floor(Math.random() * givenNames.length)]
    }
    
    // 过滤后的房间列表
    const filteredRooms = computed(() => {
      return rooms.value.filter(room => 
        room.floor === currentFloor.value && 
        activeFilters.value.includes(room.maintenance ? 'maintenance' : room.status)
      )
    })
    
    // 切换状态过滤器
    function toggleFilter(filterValue) {
      const index = activeFilters.value.indexOf(filterValue)
      if (index === -1) {
        activeFilters.value.push(filterValue)
      } else {
        activeFilters.value.splice(index, 1)
      }
    }
    
    // 获取房型标签
    function getRoomTypeLabel(type) {
      const found = roomTypes.find(t => t.value === type)
      return found ? found.label : type
    }
    
    // 获取状态标签
    function getStatusLabel(status) {
      const map = {
        vacant: '空房',
        occupied: '已入住',
        reserved: '已预订',
        maintenance: '维修中'
      }
      return map[status] || status
    }
    
    // 获取状态颜色
    function getStatusColor(status) {
      const map = {
        vacant: '#E8F5E9',
        occupied: '#FFEBEE',
        reserved: '#FFF3E0',
        maintenance: '#F5F5F5'
      }
      return map[status] || '#F5F5F5'
    }
    
    // 获取状态文字颜色
    function getStatusTextColor(status) {
      const map = {
        vacant: '#2E7D32',
        occupied: '#C62828',
        reserved: '#E65100',
        maintenance: '#424242'
      }
      return map[status] || '#424242'
    }
    
    // 获取清洁状态标签
    function getCleanLabel(status) {
      const map = {
        clean: '已清洁',
        dirty: '待清洁',
        inspected: '已检查'
      }
      return map[status] || status
    }
    
    // 获取清洁图标
    function getCleanIcon(status) {
      const map = {
        clean: 'check',
        dirty: 'close',
        inspected: 'time'
      }
      return map[status] || 'clean'
    }
    
    // 格式化日期
    function formatDate(date) {
      if (!date) return ''
      return date.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' })
    }
    
    // 格式化日期时间
    function formatDateTime(date) {
      if (!date) return ''
      return date.toLocaleString('zh-CN', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    }
    
    // 打开房间详情
    function openRoomDetail(room) {
      selectedRoom.value = room
      detailSidebarOpen.value = true
    }
    
    // 办理入住
    function checkIn(room) {
      console.log('办理入住:', room.number)
      rooms.value = rooms.value.map(r => {
        if (r.number === room.number) {
          return {
            ...r,
            status: 'occupied',
            cleanStatus: 'dirty',
            guest: {
              name: '新客人',
              phone: '13800138000'
            },
            checkInDate: new Date(),
            checkOutDate: new Date(Date.now() + 86400000)
          }
        }
        return r
      })
      detailSidebarOpen.value = false
    }
    
    // 办理退房
    function checkOut(room) {
      console.log('办理退房:', room.number)
      rooms.value = rooms.value.map(r => {
        if (r.number === room.number) {
          return {
            ...r,
            status: 'vacant',
            cleanStatus: 'dirty',
            guest: null,
            checkInDate: null,
            checkOutDate: null
          }
        }
        return r
      })
      detailSidebarOpen.value = false
    }
    
    // 预订房间
    function reserveRoom(room) {
      console.log('预订房间:', room.number)
      rooms.value = rooms.value.map(r => {
        if (r.number === room.number) {
          return {
            ...r,
            status: 'reserved',
            guest: {
              name: '预订客人',
              phone: '13800138000'
            },
            checkInDate: new Date(Date.now() + 86400000),
            checkOutDate: new Date(Date.now() + 172800000)
          }
        }
        return r
      })
      detailSidebarOpen.value = false
    }
    
    // 切换维修状态
    function toggleMaintenance(room) {
      console.log('切换维修状态:', room.number)
      rooms.value = rooms.value.map(r => {
        if (r.number === room.number) {
          return {
            ...r,
            maintenance: !r.maintenance,
            status: !r.maintenance ? 'vacant' : r.status,
            cleanStatus: !r.maintenance ? null : r.cleanStatus
          }
        }
        return r
      })
    }
    
    // 更改清洁状态
    function changeCleanStatus(room) {
      console.log('更改清洁状态:', room.number)
      const nextStatus = {
        clean: 'inspected',
        dirty: 'clean',
        inspected: 'dirty'
      }[room.cleanStatus]
      
      rooms.value = rooms.value.map(r => {
        if (r.number === room.number) {
          return {
            ...r,
            cleanStatus: nextStatus
          }
        }
        return r
      })
    }
    
    return {
      floors,
      currentFloor,
      statusFilters,
      activeFilters,
      rooms,
      filteredRooms,
      currentDate,
      detailSidebarOpen,
      selectedRoom,
      toggleFilter,
      getRoomTypeLabel,
      getStatusLabel,
      getStatusColor,
      getStatusTextColor,
      getCleanLabel,
      getCleanIcon,
      formatDate,
      formatDateTime,
      openRoomDetail,
      checkIn,
      checkOut,
      reserveRoom,
      toggleMaintenance,
      changeCleanStatus
    }
  }
}
</script>

<style scoped>
.modern-room-status {
  font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f8f9fa;
  color: #333;
}

/* 控制面板样式 */
.control-panel {
  background-color: #fff;
  padding: 16px 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.panel-section {
  display: flex;
  align-items: center;
  gap: 20px;
}

.panel-title {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
}

.date-display {
  font-size: 14px;
  color: #7f8c8d;
}

.floor-navigation {
  display: flex;
  gap: 8px;
}

.floor-btn {
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  background-color: #fff;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.floor-btn:hover {
  background-color: #f5f5f5;
}

.floor-btn.active {
  background-color: #3498db;
  color: white;
  border-color: #3498db;
}

.status-filters {
  display: flex;
  gap: 12px;
}

.filter-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  background-color: #f5f5f5;
  transition: all 0.2s;
}

.filter-item:hover {
  background-color: #e0e0e0;
}

.filter-item.active {
  background-color: #e3f2fd;
}

.filter-badge {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

/* 房态网格样式 */
.room-grid-container {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.room-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 16px;
}

.room-card {
  background-color: #fff;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
  position: relative;
  overflow: hidden;
  border-left: 4px solid #3498db;
}

.room-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.room-card.standard {
  border-left-color: #2196F3;
}

.room-card.deluxe {
  border-left-color: #4CAF50;
}

.room-card.suite {
  border-left-color: #FF9800;
}

.room-card.family {
  border-left-color: #9C27B0;
}

.room-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.room-number {
  font-weight: 600;
  font-size: 16px;
}

.room-type {
  font-size: 12px;
  color: #7f8c8d;
  background-color: #f5f5f5;
  padding: 2px 6px;
  border-radius: 4px;
}

.room-status {
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
  margin-bottom: 8px;
  display: inline-block;
}

.guest-info {
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px dashed #eee;
}

.guest-name {
  font-weight: 500;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.stay-dates {
  display: flex;
  gap: 4px;
  font-size: 12px;
  color: #7f8c8d;
  margin-top: 4px;
}

.clean-indicator {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

.clean-indicator.clean {
  background-color: #4CAF50;
  color: white;
}

.clean-indicator.dirty {
  background-color: #F44336;
  color: white;
}

.clean-indicator.inspected {
  background-color: #FFC107;
  color: white;
}

.maintenance-indicator {
  position: absolute;
  bottom: 12px;
  right: 12px;
  color: #9E9E9E;
}

.icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  vertical-align: middle;
  margin-right: 4px;
}

.icon.check {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z'/%3E%3C/svg%3E");
}

.icon.close {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z'/%3E%3C/svg%3E");
}

.icon.time {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z'/%3E%3Cpath d='M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z'/%3E%3C/svg%3E");
}

.icon.tools {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23616161'%3E%3Cpath d='M21.71 20.29L18 16.61A7.93 7.93 0 0 0 20 12a8 8 0 1 0-8 8 7.93 7.93 0 0 0 4.61-2l3.68 3.68a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.39zM4 12a6 6 0 1 1 6 6 6 6 0 0 1-6-6z'/%3E%3C/svg%3E");
}

.icon.key {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M12.65 10C11.7 7.31 8.9 5.5 5.77 6.12c-2.29.46-4.15 2.29-4.63 4.58C.32 14.57 3.26 18 7 18c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z'/%3E%3C/svg%3E");
}

.icon.exit {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z'/%3E%3C/svg%3E");
}

.icon.calendar {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z'/%3E%3C/svg%3E");
}

.icon.clean {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23333'%3E%3Cpath d='M19.36 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.64-4.96zM10 17l-3.5-3.5 1.41-1.41L10 14.17 15.18 9l1.41 1.41L10 17z'/%3E%3C/svg%3E");
}

.icon.close {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23333'%3E%3Cpath d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z'/%3E%3C/svg%3E");
}

/* 房间详情侧边栏样式 */
.room-detail-sidebar {
  position: fixed;
  top: 0;
  right: -400px;
  width: 380px;
  height: 100vh;
  background-color: #fff;
  box-shadow: -2px 0 12px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease;
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

.room-detail-sidebar.active {
  right: 0;
}

.sidebar-header {
  padding: 16px 24px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sidebar-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
}

.close-btn:hover {
  background-color: #f5f5f5;
}

.sidebar-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.room-info, .guest-details {
  margin-bottom: 24px;
}

.info-item {
  margin-bottom: 16px;
}

.info-item label {
  display: block;
  font-size: 14px;
  color: #7f8c8d;
  margin-bottom: 4px;
}

.info-item .value {
  font-size: 16px;
}

.status-tag, .clean-tag, .maintenance-tag {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
}

.clean-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.clean-tag.clean {
  background-color: #E8F5E9;
  color: #2E7D32;
}

.clean-tag.dirty {
  background-color: #FFEBEE;
  color: #C62828;
}

.clean-tag.inspected {
  background-color: #FFF8E1;
  color: #E65100;
}

.maintenance-tag {
  background-color: #EEEEEE;
  color: #424242;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
}

.action-btn {
  padding: 10px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s;
}

.action-btn.primary {
  background-color: #3498db;
  color: white;
}

.action-btn.primary:hover {
  background-color: #2980b9;
}

.action-btn.warning {
  background-color: #e74c3c;
  color: white;
}

.action-btn.warning:hover {
  background-color: #c0392b;
}

.action-btn.secondary {
  background-color: #2ecc71;
  color: white;
}

.action-btn.secondary:hover {
  background-color: #27ae60;
}

.action-btn:hover {
  background-color: #f5f5f5;
}

/* 侧边栏遮罩 */
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;
}

.sidebar-overlay.active {
  opacity: 1;
  visibility: visible;
}

/* 响应式调整 */
@media (max-width: 992px) {
  .control-panel {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .panel-section {
    width: 100%;
    justify-content: space-between;
  }
  
  .room-grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  }
}

@media (max-width: 768px) {
  .room-detail-sidebar {
    width: 100%;
    right: -100%;
  }
  
  .room-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }
}
</style>