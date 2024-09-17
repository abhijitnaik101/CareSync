

export default function ReceptionistRegistrationTable({registrations}){
    return(
        <div className="bg-white shadow-sm rounded-md p-4">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-white bg-indigo-500">Patient</th>
                  <th className="px-4 py-2 text-left text-white bg-indigo-500">Date</th>
                  <th className="px-4 py-2 text-left text-white bg-indigo-500">Gender</th>
                  <th className="px-4 py-2 text-left text-white bg-indigo-500">Contact</th>
                  <th className="px-4 py-2 text-left text-white bg-indigo-500">Type</th>
                  <th className="px-4 py-2 text-left text-white bg-indigo-500"></th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((row: any , index : number) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2">{row.name}</td>
                    <td className="px-4 py-2">{row.appointmentDate}</td>
                    <td className="px-4 py-2">{row.gender}</td>
                    <td className="px-4 py-2">{row.contact}</td>
                    <td className="px-4 py-2">{row.appointType}</td>
                    <td className="px-4 py-2">
                      <button className="text-blue-600 hover:underline">Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
    )
}