export const Error404 = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '500px',
          height: '300px',
          background: '#c73030',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '10px',
          fontSize: '25px',
          fontWeight: 'bold',
        }}
      >
        Error 404: Not Found
      </div>
    </div>
  );
};
