import * as React from 'react';

export interface ToggleCheckboxesProps {
  toggleAll: boolean;
  handleOnToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ToggleCheckboxes: React.StatelessComponent<ToggleCheckboxesProps> = ({ toggleAll, handleOnToggle }) => {
  return (
    <div className="toggle-component">
      <input 
        className="toggle-all"
        id="toggle-all" 
        type="checkbox" 
        checked={toggleAll}
        onChange={handleOnToggle} />
      <label htmlFor="toggle-all">Mark all as complete</label>
    </div>
  );
}