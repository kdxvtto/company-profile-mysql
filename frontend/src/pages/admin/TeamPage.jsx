import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Search, Loader2, Facebook, Instagram } from 'lucide-react';
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
import { teamAPI } from '@/lib/api';

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

const TeamPage = () => {
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMember, setEditingMember] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        position: '',
        facebook: '',
        instagram: '',
        image: null,
    });
    const [submitting, setSubmitting] = useState(false);

    // Fetch team data
    const fetchTeam = async () => {
        try {
            setLoading(true);
            const response = await teamAPI.getAll();
            setTeam(response.data.data || []);
        } catch (error) {
            console.error('Error fetching team:', error);
            // Use dummy data for demo
            setTeam([
                { _id: '1', name: 'Suparmo, S.E.', position: 'Direktur Utama', image: 'https://bankwonogiri.co.id/assets/wng/img/photos/mamok.png' },
                { _id: '2', name: 'Budi Santoso', position: 'Direktur', image: '' },
                { _id: '3', name: 'Sri Wahyuni', position: 'Kepala Cabang', image: '' },
            ]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeam();
    }, []);

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('position', formData.position);
            data.append('facebook', formData.facebook);
            data.append('instagram', formData.instagram);
            if (formData.image) {
                data.append('image', formData.image);
            }

            if (editingMember) {
                await teamAPI.update(editingMember._id, data);
            } else {
                await teamAPI.create(data);
            }

            fetchTeam();
            closeModal();
        } catch (error) {
            console.error('Error saving team member:', error);
            alert('Error saving data. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    // Handle delete
    const handleDelete = async (id) => {
        if (!confirm('Apakah Anda yakin ingin menghapus anggota tim ini?')) return;

        try {
            await teamAPI.delete(id);
            fetchTeam();
        } catch (error) {
            console.error('Error deleting team member:', error);
            alert('Error deleting data. Please try again.');
        }
    };

    // Open modal for add/edit
    const openModal = (member = null) => {
        if (member) {
            setEditingMember(member);
            setFormData({
                name: member.name,
                position: member.position,
                facebook: member.facebook || '',
                instagram: member.instagram || '',
                image: null,
            });
        } else {
            setEditingMember(null);
            setFormData({
                name: '',
                position: '',
                facebook: '',
                instagram: '',
                image: null,
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingMember(null);
        setFormData({
            name: '',
            position: '',
            facebook: '',
            instagram: '',
            image: null,
        });
    };

    // Filter team by search
    const filteredTeam = team.filter(member =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.position.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Team Profile</h1>
                    <p className="text-gray-600">Kelola anggota tim Bank Wonogiri</p>
                </div>
                <Button onClick={() => openModal()} className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Anggota
                </Button>
            </div>

            {/* Search */}
            <Card>
                <CardContent className="p-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Cari anggota tim..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Team Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Daftar Anggota Tim ({filteredTeam.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex items-center justify-center py-10">
                            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left py-3 px-4 font-semibold text-gray-600">Foto</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-600">Nama</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-600">Posisi</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-600">Social Media</th>
                                        <th className="text-right py-3 px-4 font-semibold text-gray-600">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredTeam.map((member) => (
                                        <tr key={member._id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="py-3 px-4">
                                                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                                                {member.image ? (
                                                        <img
                                                            src={getImageUrl(member.image)}
                                                            alt={member.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 font-semibold">
                                                            {member.name.charAt(0)}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 font-medium text-gray-900">{member.name}</td>
                                            <td className="py-3 px-4 text-gray-600">{member.position}</td>
                                            <td className="py-3 px-4">
                                                <div className="flex gap-3">
                                                    {member.facebook && (
                                                        <a href={member.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors">
                                                            <Facebook className="w-5 h-5" />
                                                        </a>
                                                    )}
                                                    {member.instagram && (
                                                        <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800 transition-colors">
                                                            <Instagram className="w-5 h-5" />
                                                        </a>
                                                    )}
                                                    {!member.facebook && !member.instagram && (
                                                        <span className="text-gray-400 text-sm">-</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => openModal(member)}
                                                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                                    >
                                                        <Pencil className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleDelete(member._id)}
                                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {filteredTeam.length === 0 && (
                                <div className="text-center py-10 text-gray-500">
                                    Tidak ada data team
                                </div>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Add/Edit Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            {editingMember ? 'Edit Anggota Tim' : 'Tambah Anggota Tim'}
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nama *</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="position">Posisi *</Label>
                                <Input
                                    id="position"
                                    value={formData.position}
                                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="facebook">Facebook URL</Label>
                                <Input
                                    id="facebook"
                                    value={formData.facebook}
                                    onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                                    placeholder="https://facebook.com/..."
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="instagram">Instagram URL</Label>
                                <Input
                                    id="instagram"
                                    value={formData.instagram}
                                    onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                                    placeholder="https://instagram.com/..."
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="image">Foto</Label>
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

export default TeamPage;
