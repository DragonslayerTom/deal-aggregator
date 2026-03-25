interface Retailer {
  retailer: string
  price: number
  url: string
}

interface PriceTableProps {
  retailers: Retailer[]
}

export default function PriceTable({ retailers }: PriceTableProps) {
  const sorted = [...retailers].sort((a, b) => a.price - b.price)
  const lowest = sorted[0]?.price

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="px-4 py-2">Retailer</th>
            <th className="px-4 py-2 text-right">Price</th>
            <th className="px-4 py-2">Link</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((item, idx) => (
            <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-4 py-3 font-medium">
                {item.retailer}
                {item.price === lowest && <span className="text-green-600 text-sm ml-2">✓ Lowest</span>}
              </td>
              <td className="px-4 py-3 text-right font-bold">
                ${item.price.toFixed(2)}
              </td>
              <td className="px-4 py-3">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View →
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
