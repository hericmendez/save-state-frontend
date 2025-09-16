import { useState } from 'react';
import { InlineEdit } from 'rsuite';

const InlineInput = () => {
  const [value, setValue] = useState("+")
      return (
<InlineEdit value={value} onEdit={()=> setValue('')} defaultValue="React Suite 🧱" style={{ width: 300 }} />
      )};

export default InlineInput