import React from 'react';
import './PaymentModal.css';

function PaymentModal({ isOpen, onClose }) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal active">
            <div className="modal-content">
                <p className='modal-header'>Слідуйте інструкціям на банківському терміналі</p>
                <div class="loader-container">
                    <div class="newtons-cradle">
                        <div class="newtons-cradle__dot"></div>
                        <div class="newtons-cradle__dot"></div>
                        <div class="newtons-cradle__dot"></div>
                        <div class="newtons-cradle__dot"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentModal;
