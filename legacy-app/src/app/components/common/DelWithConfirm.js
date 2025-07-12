import React from 'react'
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Button } from 'primereact/button';

function DelWithConfirm({message, onAccept, id}) {

    const accept = () => {
        onAccept(id);
        //toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
    };

    const reject = () => {      
        //toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    };

    const _confirm = (event) => {
        confirmPopup({
            group: 'headless',
            target: event.currentTarget,
            message: message,
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            defaultFocus: 'reject',
            accept,
            reject
        });
    };

  return (
      <>
          <ConfirmPopup
              group="headless"
              content={({ message, acceptBtnRef, rejectBtnRef, hide }) =>
                  <div className="bg-gray-900 text-white border-round p-3">
                      <span>{message}</span>
                      <div className="flex align-items-center gap-2 mt-3">
                          <Button ref={acceptBtnRef} label="Save" onClick={() => { accept(); hide(); }} className="p-button-sm p-button-outlined"></Button>
                          <Button ref={rejectBtnRef} label="Cancel" outlined onClick={() => { reject(); hide(); }} className="p-button-sm p-button-text"></Button>
                      </div>
                  </div>
              }
          />
          <button
              className="btn btn-danger  btn-icon"
              style={{ marginLeft: "5px" }}
              onClick={_confirm}
              aria-label='Delete'
              title='Delete System'
          >
              <i className="fa fa-trash"></i>
          </button>
      </>
  )
}

export default DelWithConfirm;