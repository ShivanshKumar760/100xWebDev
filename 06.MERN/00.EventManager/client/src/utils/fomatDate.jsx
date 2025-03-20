const formatDateTime = (timestamp) => {
    // Create Date object
    const utcDate = new Date(timestamp);
    
    // Convert to IST (UTC+5:30)
    const istDate = new Date(utcDate.getTime() + (5.5 * 60 * 60 * 1000));
    
    const dateOptions = { 
      weekday: 'short',
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      timeZone: 'Asia/Kolkata'
    };
    
    const timeOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata'
    };
  
    return {
      date: istDate.toLocaleDateString('en-IN', dateOptions),
      time: istDate.toLocaleTimeString('en-IN', timeOptions)
    };
  };
  
  export default formatDateTime;