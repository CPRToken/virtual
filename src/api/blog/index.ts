import type { Caps } from 'src/types/caps';


import { collection, getDocs,  } from 'firebase/firestore';
import { db} from 'src/libs/firebase';

type GetCapsRequest = object;

type GetCapsResponse = Promise<Caps[]>;

class BlogApi {
  async getCaps(request: GetCapsRequest = {}): Promise<Caps[]> {
    let usersCollection = collection(db, "users");
    let data: Caps[] = [];

    try {
      const querySnapshot = await getDocs(usersCollection);
      querySnapshot.forEach((doc) => {
        const user = doc.data();
        data.push({


          avatar:  user.avatar,
          cover: user.cover,
          dob: user.dob,
          maritalStatus: user.maritalStatus,
          name: `${user.firstName} ${user.lastName}`,
          originCity: user.originCity,
          highSchool:  user.highSchool,
          university:  user.university,
          quote:  user.quote,
          userUrl:  user.userUrl,



        });
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      // Handle the error appropriately for your app
    }

    let count = data.length; // Define count here

    // ... rest of your code remains unchanged

    return data;
  }
}


export const blogApi = new BlogApi();
