import getClientById from "@/app/_api/perfil/getClientByid";
import { useUpdateMutations } from "@/app/store/mascota/updateMutation";
import { useEffect, useState } from "react";

export default function UserData(){
    const [data, setData] = useState<any | null>(null);
    const [userId, setUserId] = useState<number | null>(null);
     const updateMutation = useUpdateMutations((state) => state.updateMutations)
     const setUpdateMutation = useUpdateMutations((state) => state.setUpdateMutations)
     
     useEffect(() => {
      const fetchData = async () => {
        try {
          const result = await getClientById();
          setData(result)
          setUserId(result.data._id)
        } catch (error) {
          return error
        }
      };
     
     if(updateMutation){
      setUpdateMutation(false)
        fetchData(); 
    } else {
      fetchData(); 
    }
    
    }, [updateMutation,setUpdateMutation]); 
    
    return {data,userId}

}