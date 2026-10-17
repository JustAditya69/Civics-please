"use server";

export async function reverseGeocode(lat: number | string, lng: number | string) {
  try {
    const numLat = Number(lat);
    const numLng = Number(lng);

    if (isNaN(numLat) || isNaN(numLng) || numLat < -90 || numLat > 90 || numLng < -180 || numLng > 180) {
      return { success: false, error: "Invalid coordinate bounds." };
    }

    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${numLat}&lon=${numLng}`,
      {
        headers: {
          "User-Agent": "CivicsPlease-App/1.0 (civicsplease-civic-app)",
          "Accept": "application/json",
        },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      return { success: false, error: `Nominatim status ${res.status}` };
    }

    const data = await res.json();
    return {
      success: true,
      address: data.display_name || "",
      road: data.address?.road || data.address?.suburb || "",
      city: data.address?.city || data.address?.town || data.address?.village || data.address?.county || "",
    };
  } catch (error: any) {
    console.error("Server reverseGeocode error:", error);
    return { success: false, error: error.message };
  }
}

export async function searchAddress(query: string) {
  try {
    if (!query || typeof query !== "string" || query.trim().length < 2) {
      return { success: false, results: [] };
    }

    const cleanQuery = query.trim().slice(0, 120);

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cleanQuery)}&limit=5&addressdetails=1`,
      {
        headers: {
          "User-Agent": "CivicsPlease-App/1.0 (civicsplease-civic-app)",
          "Accept": "application/json",
        },
      }
    );

    if (!res.ok) {
      return { success: false, error: `Nominatim status ${res.status}` };
    }

    const data = await res.json();
    return { success: true, results: Array.isArray(data) ? data : [] };
  } catch (error: any) {
    console.error("Server searchAddress error:", error);
    return { success: false, error: error.message };
  }
}
