import { FaJediOrder, FaUserCog } from 'react-icons/fa'
import MenuItem from './MenuItem'
import { MdProductionQuantityLimits } from 'react-icons/md'

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label='Manage Users' address='manage-users' />
      <MenuItem icon={MdProductionQuantityLimits} label='All Products' address='all-products' />
      <MenuItem icon={FaJediOrder } label='All Orders' address='all-orders' />
    </>
  )
}

export default AdminMenu