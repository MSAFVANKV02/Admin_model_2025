// reactSelectStyles.ts
export const customStyles = {
    control: (base: any) => ({
      ...base,
      borderColor: '#CCCCCC',
      borderRadius: '8px',
      padding: '5px',
      fontSize:"0.8rem",
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#1E40AF',
      },
    }),
    multiValue: (base: any) => ({
      ...base,
      backgroundColor: '#4A90E2',
    }),
    multiValueLabel: (base: any) => ({
      ...base,
      color: '#ffffff',
    }),
    multiValueRemove: (base: any) => ({
      ...base,
      color: '#ffffff',
      ':hover': {
        backgroundColor: '#ff0000',
      },
    }),
    placeholder: (base: any) => ({
      ...base,
      color: '#8E8E8E',
    }),
  };
  