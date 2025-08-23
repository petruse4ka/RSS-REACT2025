import { useState } from 'react';
import { useLocale } from '../hooks/use-locale';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { selectUserList, selectUserCount } from '../store/selectors';
import { addUser, deleteUser, clearAllUsers } from '../store/user-list-slice';
import Button from '../components/ui/button';
import Modal from '../components/ui/modal';
import UncontrolledForm from '../components/forms/uncontrolled-form';
import ControlledForm from '../components/forms/controlled-form';
import type { ModalType } from '../types/types';
import type { FormData } from '../types/interfaces';
import noUsersImage from '../assets/images/no-users.png';
import defaultUserImage from '../assets/icons/default-user.png';

export default function HomePage() {
  const translations = useLocale();
  const [modalState, setModalState] = useState<ModalType>(null);
  const dispatch = useAppDispatch();
  const userList = useAppSelector(selectUserList);
  const userCount = useAppSelector(selectUserCount);

  const handleFormModal = (modalType: ModalType) => {
    setModalState(modalType);
  };

  const closeModal = () => {
    setModalState(null);
  };

  const handleFormSubmit = (data: FormData) => {
    dispatch(addUser(data));
    closeModal();
  };

  const handleDeleteUser = (id: string) => {
    dispatch(deleteUser(id));
  };

  const handleClearAllUsers = () => {
    dispatch(clearAllUsers());
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

      <div className="mt-10 w-full text-center">
        <h2 className="mb-10 text-4xl text-yellow-300 md:text-5xl">
          {translations.forms.userList}
        </h2>
        {userCount > 0 ? (
          <>
            <div className="mb-6 flex items-center justify-start">
              <div className="text-gray-700 dark:text-gray-300">
                {translations.forms.totalUsers}:{' '}
                <span className="text-cyan-500 dark:text-yellow-300">{userCount}</span>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {userList.map((user, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-cyan-500 bg-white p-4 shadow-sm dark:border-yellow-300 dark:bg-indigo-900"
                >
                  <div className="mb-3 flex justify-center">
                    <img
                      src={user.picture || defaultUserImage}
                      alt="Profile"
                      className="h-20 w-20 rounded-full border-2 border-yellow-300 object-cover dark:border-cyan-500"
                    />
                  </div>
                  <div className="space-y-2">
                    {[
                      { key: 'id' as const, value: user.id },
                      { key: 'name' as const, value: user.name },
                      { key: 'age' as const, value: user.age },
                      { key: 'email' as const, value: user.email },
                      { key: 'gender' as const, value: user.gender },
                      { key: 'country' as const, value: user.country },
                      { key: 'password' as const, value: user.password },
                    ].map(({ key, value }) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                          {translations.forms[key]}:
                        </span>
                        <span className="text-sm text-gray-900 dark:text-white">{value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-center">
                    <Button
                      onClick={() => handleDeleteUser(user.id)}
                      className="bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
                      text={translations.forms.deleteUser}
                      dataTestId={`delete-user-${index}`}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 flex items-center justify-center">
              <Button
                onClick={handleClearAllUsers}
                className="bg-red-500 px-6 py-2 text-white hover:bg-red-600"
                text={translations.forms.clearAllUsers}
                dataTestId="clear-all-users-btn"
              />
            </div>
          </>
        ) : (
          <div className="my-8 w-full text-center">
            <img
              src={noUsersImage}
              alt="No users"
              className="mx-auto w-full max-w-[600px]"
              data-testid="no-users-image"
            />
            <p className="mt-5 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              {translations.forms.noUsers}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
