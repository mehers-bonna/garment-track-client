import { BsFingerprint } from 'react-icons/bs';
import { GoIssueTrackedBy } from "react-icons/go";
import MenuItem from './MenuItem';

const BuyerMenu = () => {

  return (
    <>
      <MenuItem icon={BsFingerprint} label='My Orders' address='my-orders' />
      <MenuItem icon={GoIssueTrackedBy} label='Track Order' address='track-order' />
    </>
  )
};

export default BuyerMenu;