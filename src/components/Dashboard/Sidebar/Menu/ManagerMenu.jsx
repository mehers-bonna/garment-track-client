import { BsFillHouseAddFill } from 'react-icons/bs'
import { MdHomeWork, MdOutlineManageHistory, MdOutlinePendingActions } from 'react-icons/md'
import MenuItem from './MenuItem'
const ManagerMenu = () => {
  return (
    <>
      <MenuItem
        icon={BsFillHouseAddFill}
        label='Add Product'
        address='add-product'
      />
      <MenuItem icon={MdHomeWork} label='Manage Product' address='manage-product' />
      <MenuItem icon={MdOutlinePendingActions} label='Pending Orders' address='pending-orders' />
      <MenuItem
        icon={MdOutlineManageHistory}
        label='Approve Orders'
        address='approve-orders'
      />
    </>
  )
}

export default ManagerMenu