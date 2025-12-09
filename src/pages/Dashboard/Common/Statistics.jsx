import AdminStatistics from '../../../components/Dashboard/Statistics/AdminStatistics'
import ManagerStatistics from '../../../components/Dashboard/Statistics/ManagerStatistics';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import useRole from '../../../hooks/useRole'
import BuyerStatistics from './../../../components/Dashboard/Statistics/BuyerStatistics';
const Statistics = () => {
  const [role, isRoleLoading] = useRole()
  if (isRoleLoading) return <LoadingSpinner></LoadingSpinner>
  return <div>
    {role === 'admin' && <AdminStatistics></AdminStatistics>}
    {role === 'buyer' && <BuyerStatistics></BuyerStatistics>}
    {role === 'manager' && <ManagerStatistics></ManagerStatistics>}
    </div>
}

export default Statistics