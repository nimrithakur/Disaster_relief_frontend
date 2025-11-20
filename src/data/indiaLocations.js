// A compact locations dataset: states / UTs with capital and common cities.
// Not exhaustive (district-level lists are large). This provides structured selects
// and can be expanded later or replaced by a full dataset or Places API.

const INDIA_STATES = [
  { name: 'Andhra Pradesh', capital: 'Amaravati', cities: ['Visakhapatnam','Vijayawada','Guntur','Nellore','Kurnool'] },
  { name: 'Arunachal Pradesh', capital: 'Itanagar', cities: ['Itanagar','Tawang','Ziro'] },
  { name: 'Assam', capital: 'Dispur', cities: ['Guwahati','Dibrugarh','Silchar','Jorhat'] },
  { name: 'Bihar', capital: 'Patna', cities: ['Patna','Gaya','Bhagalpur','Muzzafarpur'] },
  { name: 'Chhattisgarh', capital: 'Raipur', cities: ['Raipur','Bhilai','Durg','Bilaspur'] },
  { name: 'Goa', capital: 'Panaji', cities: ['Panaji','Margao'] },
  { name: 'Gujarat', capital: 'Gandhinagar', cities: ['Ahmedabad','Surat','Vadodara','Rajkot'] },
  { name: 'Haryana', capital: 'Chandigarh', cities: ['Gurugram','Faridabad','Panipat','Karnal'] },
  { name: 'Himachal Pradesh', capital: 'Shimla', cities: ['Shimla','Dharamshala','Solan'] },
  { name: 'Jharkhand', capital: 'Ranchi', cities: ['Ranchi','Jamshedpur','Dhanbad'] },
  { name: 'Karnataka', capital: 'Bengaluru', cities: ['Bengaluru','Mysore','Mangalore','Hubli'] },
  { name: 'Kerala', capital: 'Thiruvananthapuram', cities: ['Thiruvananthapuram','Kochi','Kozhikode','Thrissur'] },
  { name: 'Madhya Pradesh', capital: 'Bhopal', cities: ['Bhopal','Indore','Gwalior','Jabalpur'] },
  { name: 'Maharashtra', capital: 'Mumbai', cities: ['Mumbai','Pune','Nagpur','Nashik','Thane'] },
  { name: 'Manipur', capital: 'Imphal', cities: ['Imphal','Thoubal'] },
  { name: 'Meghalaya', capital: 'Shillong', cities: ['Shillong','Tura'] },
  { name: 'Mizoram', capital: 'Aizawl', cities: ['Aizawl','Lunglei'] },
  { name: 'Nagaland', capital: 'Kohima', cities: ['Kohima','Dimapur'] },
  { name: 'Odisha', capital: 'Bhubaneswar', cities: ['Bhubaneswar','Cuttack','Rourkela'] },
  { name: 'Punjab', capital: 'Chandigarh', cities: ['Amritsar','Ludhiana','Jalandhar','Patiala'] },
  { name: 'Rajasthan', capital: 'Jaipur', cities: ['Jaipur','Jodhpur','Udaipur','Bikaner'] },
  { name: 'Sikkim', capital: 'Gangtok', cities: ['Gangtok','Namchi'] },
  { name: 'Tamil Nadu', capital: 'Chennai', cities: ['Chennai','Coimbatore','Madurai','Tiruchirappalli'] },
  { name: 'Telangana', capital: 'Hyderabad', cities: ['Hyderabad','Warangal','Nizamabad'] },
  { name: 'Tripura', capital: 'Agartala', cities: ['Agartala'] },
  { name: 'Uttar Pradesh', capital: 'Lucknow', cities: ['Lucknow','Kanpur','Varanasi','Agra','Meerut'] },
  { name: 'Uttarakhand', capital: 'Dehradun', cities: ['Dehradun','Haridwar','Rishikesh'] },
  { name: 'West Bengal', capital: 'Kolkata', cities: ['Kolkata','Asansol','Siliguri','Howrah'] },
  // Union Territories
  { name: 'Andaman and Nicobar Islands', capital: 'Port Blair', cities: ['Port Blair'] },
  { name: 'Chandigarh', capital: 'Chandigarh', cities: ['Chandigarh'] },
  { name: 'Dadra and Nagar Haveli and Daman and Diu', capital: 'Daman', cities: ['Daman','Silvassa'] },
  { name: 'Delhi', capital: 'New Delhi', cities: ['New Delhi','North Delhi','South Delhi'] },
  { name: 'Jammu and Kashmir', capital: 'Srinagar', cities: ['Srinagar','Jammu'] },
  { name: 'Ladakh', capital: 'Leh', cities: ['Leh','Kargil'] },
  { name: 'Puducherry', capital: 'Puducherry', cities: ['Puducherry','Karaikal'] }
];

export default INDIA_STATES;
