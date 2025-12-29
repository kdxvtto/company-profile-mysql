import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Search, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { servicesAPI } from '@/lib/api';

// Base URL untuk gambar dari backend
const API_BASE_URL = 'http://localhost:3000';

// Helper function untuk mendapatkan URL gambar yang benar
const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    // Jika sudah URL lengkap, kembalikan langsung
    if (imagePath.startsWith('http')) return imagePath;
    // Jika path relatif, tambahkan base URL
    return `${API_BASE_URL}${imagePath}`;
};

const ServicesPage = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: 'Kredit',
        image: null,
    });
    const [submitting, setSubmitting] = useState(false);

    // Fetch services data
    const fetchServices = async () => {
        try {
            setLoading(true);
            const response = await servicesAPI.getAll();
            setServices(response.data.data || []);
        } catch (error) {
            console.error('Error fetching services:', error);
            // Use dummy data for demo
            setServices([
                { _id: '1', title: 'Kredit Umum', content: 'Pinjaman untuk berbagai kebutuhan dengan tenor fleksibel.', image: '' },
                { _id: '2', title: 'Kredit Sumeh', content: 'Kredit mikro dengan nominal maksimal Rp 2.000.000.', image: '' },
                { _id: '3', title: 'Kredit Elektronik', content: 'Kredit untuk pembelian barang elektronik.', image: '' },
                { _id: '4', title: 'Kredit Wonogiren', content: 'Kredit khusus warga Wonogiri dengan bunga rendah.', image: '' },
            ]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const data = new FormData();
            data.append('title', formData.title);
            data.append('content', formData.content);
            data.append('category', formData.category);
            if (formData.image) {
                data.append('image', formData.image);
            }

            if (editingService) {
                await servicesAPI.update(editingService._id, data);
            } else {
                await servicesAPI.create(data);
            }

            fetchServices();
            closeModal();
        } catch (error) {
            console.error('Error saving service:', error);
            alert('Error saving data. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    // Handle delete
    const handleDelete = async (id) => {
        if (!confirm('Apakah Anda yakin ingin menghapus layanan ini?')) return;

        try {
            await servicesAPI.delete(id);
            fetchServices();
        } catch (error) {
            console.error('Error deleting service:', error);
            alert('Error deleting data. Please try again.');
        }
    };

    // Open modal for add/edit
    const openModal = (service = null) => {
        if (service) {
            setEditingService(service);
            setFormData({
                title: service.title,
                content: service.content,
                category: service.category || 'Kredit',
                image: null,
            });
        } else {
            setEditingService(null);
            setFormData({
                title: '',
                content: '',
                category: 'Kredit',
                image: null,
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingService(null);
        setFormData({
            title: '',
            content: '',
            image: null,
        });
    };

    // Filter services by search
    const filteredServices = services.filter(service =>
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Services</h1>
                    <p className="text-gray-600">Kelola layanan Bank Wonogiri</p>
                </div>
                <Button onClick={() => openModal()} className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Layanan
                </Button>
            </div>

            {/* Search */}
            <Card>
                <CardContent className="p-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Cari layanan..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full flex items-center justify-center py-10">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                    </div>
                ) : filteredServices.length > 0 ? (
                    filteredServices.map((service) => (
                        <Card key={service._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="h-40 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                                {service.image ? (
                                            <img
                                                src={getImageUrl(service.image)}
                                                alt={service.title}
                                                className="w-full h-full object-cover"
                                            />
                                ) : (
                                    <span className="text-4xl">🏦</span>
                                )}
                            </div>
                            <CardContent className="p-4">
                                <h3 className="font-bold text-lg text-gray-900 mb-2">{service.title}</h3>
                                <p className="text-gray-600 text-sm line-clamp-2">{service.content}</p>
                                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => openModal(service)}
                                        className="flex-1"
                                    >
                                        <Pencil className="w-4 h-4 mr-1" />
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleDelete(service._id)}
                                        className="text-red-600 border-red-200 hover:bg-red-50"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-full text-center py-10 text-gray-500">
                        Tidak ada layanan
                    </div>
                )}
            </div>

            {/* Add/Edit Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>
                            {editingService ? 'Edit Layanan' : 'Tambah Layanan'}
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Judul *</Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="content">Deskripsi *</Label>
                                <textarea
                                    id="content"
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    className="w-full min-h-[120px] px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="category">Kategori</Label>
                                <select
                                    id="category"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="Kredit">Kredit</option>
                                    <option value="Tabungan">Tabungan</option>
                                    <option value="Deposito">Deposito</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="image">Gambar</Label>
                                <Input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={closeModal}>
                                Batal
                            </Button>
                            <Button type="submit" disabled={submitting} className="bg-blue-600 hover:bg-blue-700">
                                {submitting ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Menyimpan...
                                    </>
                                ) : (
                                    'Simpan'
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ServicesPage;
