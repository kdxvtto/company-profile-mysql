import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Search, Loader2, Calendar } from 'lucide-react';
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
import { newsAPI } from '@/lib/api';

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

const NewsPage = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingNews, setEditingNews] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: 'Berita',
        image: null,
    });
    const [submitting, setSubmitting] = useState(false);

    // Format date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    // Fetch news data
    const fetchNews = async () => {
        try {
            setLoading(true);
            const response = await newsAPI.getAll();
            setNews(response.data.data || []);
        } catch (error) {
            console.error('Error fetching news:', error);
            // Use dummy data for demo
            setNews([
                { _id: '1', title: 'Bank Wonogiri Raih Penghargaan Bank Sehat 2024', content: 'PT BPR BANK WONOGIRI berhasil meraih penghargaan sebagai Bank Sehat tahun 2024...', date: '2024-12-20', image: [] },
                { _id: '2', title: 'Peluncuran Layanan Digital Baru', content: 'Dalam rangka meningkatkan pelayanan kepada nasabah, Bank Wonogiri meluncurkan...', date: '2024-12-15', image: [] },
                { _id: '3', title: 'Program Kredit UMKM 2025', content: 'Bank Wonogiri membuka program kredit khusus untuk UMKM dengan bunga rendah...', date: '2024-12-10', image: [] },
            ]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
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

            if (editingNews) {
                await newsAPI.update(editingNews._id, data);
            } else {
                await newsAPI.create(data);
            }

            fetchNews();
            closeModal();
        } catch (error) {
            console.error('Error saving news:', error);
            alert('Error saving data. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    // Handle delete
    const handleDelete = async (id) => {
        if (!confirm('Apakah Anda yakin ingin menghapus berita ini?')) return;

        try {
            await newsAPI.delete(id);
            fetchNews();
        } catch (error) {
            console.error('Error deleting news:', error);
            alert('Error deleting data. Please try again.');
        }
    };

    // Open modal for add/edit
    const openModal = (newsItem = null) => {
        if (newsItem) {
            setEditingNews(newsItem);
            setFormData({
                title: newsItem.title,
                content: newsItem.content,
                category: newsItem.category || '',
                image: null,
            });
        } else {
            setEditingNews(null);
            setFormData({
                title: '',
                content: '',
                category: 'Berita',
                image: null,
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingNews(null);
        setFormData({
            title: '',
            content: '',
            category: 'Berita',
            image: null,
        });
    };

    // Filter news by search
    const filteredNews = news.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">News</h1>
                    <p className="text-gray-600">Kelola berita dan artikel Bank Wonogiri</p>
                </div>
                <Button onClick={() => openModal()} className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Berita
                </Button>
            </div>

            {/* Search */}
            <Card>
                <CardContent className="p-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Cari berita..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* News Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Daftar Berita ({filteredNews.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex items-center justify-center py-10">
                            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredNews.length > 0 ? (
                                filteredNews.map((item) => (
                                    <div key={item._id} className="flex gap-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                                        {/* Image */}
                                        <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                            {item.image && item.image.length > 0 ? (
                                                <img
                                                    src={getImageUrl(item.image[0])}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-3xl">📰</span>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{item.title}</h3>
                                            <p className="text-gray-600 text-sm line-clamp-2 mb-2">{item.content}</p>
                                            <div className="flex items-center gap-2 text-gray-400 text-xs">
                                                <Calendar className="w-3 h-3" />
                                                <span>{formatDate(item.date || item.createdAt)}</span>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => openModal(item)}
                                                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(item._id)}
                                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-10 text-gray-500">
                                    Tidak ada berita
                                </div>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Add/Edit Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>
                            {editingNews ? 'Edit Berita' : 'Tambah Berita'}
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
                                <Label htmlFor="content">Konten *</Label>
                                <textarea
                                    id="content"
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    className="w-full min-h-[200px] px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                    <option value="Berita">Berita</option>
                                    <option value="Pengumuman">Pengumuman</option>
                                    <option value="Promosi">Promosi</option>
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

export default NewsPage;
