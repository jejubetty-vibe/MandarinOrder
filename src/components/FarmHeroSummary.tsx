import React from 'react';
import { Calendar, MessageSquare, Plus } from 'lucide-react';
import { AppSettings, Order } from '../types';

interface FarmHeroSummaryProps {
  orders: Order[];
  settings: AppSettings;
  onOpenSmartPaste: () => void;
  onOpenNewOrder: () => void;
  onOpenPreOrderModal: () => void;
}

export const FarmHeroSummary: React.FC<FarmHeroSummaryProps> = ({
  orders,
  onOpenNewOrder,
  onOpenPreOrderModal,
}) => {
  // All pending dispatch orders (excluding delivered, cancelled, and pending payment)
  const pendingDispatchOrders = orders.filter(
    (o) => o.status !== 'delivered' && o.status !== 'cancelled' && o.status !== 'payment_pending'
  );
  const pendingOrders = orders.filter((o) => o.status === 'payment_pending');

  return (
    /* Box background set to the exact color attached by user: #f7e2e2 */
    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#f7e2e2] text-slate-800 shadow-xs border border-[#ecd2d2]">
      {/* Content */}
      <div className="relative z-10 p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="space-y-2 max-w-xl">
          {/* User requirement: 햇감귤 산지직송 주문관리는 박스 테두리 넣지 않고 */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#5c7eb1]">
            <span className="select-none">🍊</span>
            <span>햇감귤 산지직송 주문 관리</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-[#1f3d59] tracking-tight leading-snug">
            귤 주문 관리
          </h1>

          {/* Action buttons: 주문 안내문자 and 주문 접수 side by side */}
          <div className="pt-1.5 flex items-center gap-2.5 flex-wrap">
            <button
              type="button"
              onClick={onOpenPreOrderModal}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-bold rounded-xl bg-white hover:bg-slate-50 text-[#1f3d59] border border-[#ecd2d2] transition-all shadow-2xs hover:scale-102 active:scale-98"
              title="주문 전 고객에게 몇 kg 얼마, 계좌번호, 발송안내 문자 전송"
            >
              <MessageSquare className="w-4 h-4 text-[#5c7eb1]" />
              <span>주문 안내문자</span>
            </button>

            <button
              type="button"
              onClick={onOpenNewOrder}
              className="inline-flex items-center justify-center gap-1.5 px-4.5 py-2 text-xs sm:text-sm font-bold rounded-xl bg-[#5c7eb1] hover:bg-[#4d6c99] text-white transition-all shadow-xs active:scale-98"
            >
              <Plus className="w-4 h-4" />
              <span>주문 접수</span>
            </button>
          </div>
        </div>

        {/* Quick KPI Card: 발송 예정 & 입금 대기 */}
        <div className="w-full md:w-auto shrink-0">
          <div className="p-3.5 rounded-xl bg-white/90 border border-[#ecd2d2] flex items-center justify-between gap-5 shadow-2xs">
            <div className="text-xs">
              <div className="text-[#5c7eb1] flex items-center gap-1 font-bold">
                <Calendar className="w-3.5 h-3.5 text-[#5c7eb1]" />
                발송 예정
              </div>
              <div className="text-lg font-black text-[#1f3d59] font-mono mt-0.5">
                {pendingDispatchOrders.length}건
              </div>
            </div>
            <div className="text-xs text-right border-l border-slate-200 pl-5">
              <div className="text-slate-500 font-medium">입금 대기</div>
              <div className="text-lg font-black text-rose-600 font-mono mt-0.5">
                {pendingOrders.length}건
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
