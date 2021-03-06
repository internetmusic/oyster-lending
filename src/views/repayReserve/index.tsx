import React from "react";
import { useLendingObligation, useLendingReserve } from "../../hooks";
import { useParams } from "react-router-dom";

import { RepayInput } from "../../components/RepayInput";
import {
  SideReserveOverview,
  SideReserveOverviewMode,
} from "../../components/SideReserveOverview";

import "./style.less";

export const RepayReserveView = () => {
  const { reserve: reserveId, obligation: obligationId } = useParams<{
    reserve?: string;
    obligation?: string;
  }>();

  const lendingObligation = useLendingObligation(obligationId);
  const lendingReserve = useLendingReserve(
    obligationId ? lendingObligation?.info.borrowReserve : reserveId
  );
  const reserve = lendingReserve?.info;

  if (!reserve || !lendingReserve || !lendingObligation) {
    return null;
  }

  return (
    <div className="repay-reserve">
      <div className="repay-reserve-container">
        <RepayInput
          className="repay-reserve-item repay-reserve-item-left"
          reserve={lendingReserve}
          obligation={lendingObligation}
        />
        <SideReserveOverview
          className="repay-reserve-item repay-reserve-item-right"
          reserve={lendingReserve}
          mode={SideReserveOverviewMode.Borrow}
        />
      </div>
    </div>
  );
};
