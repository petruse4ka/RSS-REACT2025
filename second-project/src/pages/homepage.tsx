import { useState } from 'react';
import { useLocale } from '../hooks/use-locale';
import Button from '../components/ui/button';
import Modal from '../components/ui/modal';
import UncontrolledForm from '../components/forms/uncontrolled-form';
import ControlledForm from '../components/forms/controlled-form';
import type { ModalType } from '../types/types';
import type { FormData } from '../types/interfaces';

export default function HomePage() {
  const translations = useLocale();
  const [modalState, setModalState] = useState<ModalType>(null);
  const [userList, setUserList] = useState<FormData[]>([]);

  const handleFormModal = (modalType: ModalType) => {
    setModalState(modalType);
  };

  const closeModal = () => {
    setModalState(null);
  };

  const handleFormSubmit = (data: FormData) => {
    setUserList((prev) => [...prev, data]);
    closeModal();
  };

  const isModalOpen = modalState !== null;

  return (
    <div data-testid="homepage" className="flex w-full flex-col items-center">
      <div className="flex w-full flex-col gap-4 lg:flex-row">
        <Button
          onClick={() => handleFormModal('uncontrolled')}
          className="w-full bg-cyan-500 hover:bg-cyan-400"
          text={translations.forms.uncontrolledForm}
          dataTestId="uncontrolled-form-btn"
        />
        <Button
          onClick={() => handleFormModal('reactHookForm')}
          className="w-full bg-yellow-300 hover:bg-yellow-400"
          text={translations.forms.reactHookForm}
          dataTestId="react-hook-form-btn"
        />
      </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={
            modalState === 'uncontrolled'
              ? translations.forms.uncontrolledForm
              : translations.forms.reactHookForm
          }
          dataTestId={`${modalState}-form-modal`}
        >
          {modalState === 'uncontrolled' && <UncontrolledForm onSubmit={handleFormSubmit} />}
          {modalState === 'reactHookForm' && <ControlledForm onSubmit={handleFormSubmit} />}
        </Modal>
      )}
      {userList.length > 0 && <div className="mt-8 w-full">ITEMS WILL BE HERE</div>}
    </div>
  );
}
