    <template>
        <div style="display:none">
            <div id="music-player"
                style="position: fixed; bottom:0; left:0; width:1px; height:1px; opacity:0; pointer-events:none;"></div>


        </div>
        <div v-if="!musicStarted"
            class="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex flex-col gap-6 items-center justify-center text-white">

            <h1 class="text-3xl font-bold animate-pulse">
                Hello Cô Hòa nhaaaaa 🌸
            </h1>

            <button @click="startMusic"
                class="bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-3 rounded-xl text-xl shadow-lg active:scale-95 transition">
                Bắm vào đây đi cô...
            </button>
        </div>





        <div v-if="successMessage"
            class="fixed top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-[9999] animate-fade-in">
            {{ successMessage }}
        </div>
        <div
            class="min-h-screen bg-gradient-to-br from-violet-100 via-purple-50 to-fuchsia-100 relative overflow-hidden">

            <!-- FALLING FLOWERS -->
            <div class="falling-flowers pointer-events-none">
                <span v-for="n in 200" :key="n" class="flower">🌸</span>
            </div>

            <!-- Animated background elements -->
            <div class="absolute inset-0 overflow-hidden pointer-events-none">
                <div v-for="(s, i) in bgSparkles" :key="i" class="absolute" :style="{
                    left: s.left,
                    top: s.top,
                    animationDuration: s.duration + 's',
                    animationDelay: s.delay + 's',
                }">
                    <Sparkles class="text-purple-300 animate-float opacity-30" :size="s.size" />
                </div>
            </div>

            <Transition name="fade" mode="out-in">
                <!-- WELCOME SCREEN -->
                <div v-if="!showMembers" key="welcome"
                    class="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
                    <!-- Main title -->
                    <div class="text-center mb-8">
                        <div class="inline-block animate-wiggle">
                            <Sparkles class="mx-auto text-yellow-500 mb-4" :size="48" />
                        </div>

                        <h1 class="text-6xl md:text-8xl lg:text-9xl mb-6 animate-gradient-x" style="
                background-image: linear-gradient(90deg, #ec4899, #a855f7, #8b5cf6, #ec4899);
                background-size: 200% 100%;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                ">
                            20/11
                        </h1>

                        <h2 class="text-2xl md:text-4xl text-purple-800 mb-4 opacity-0 animate-fade-in-delayed">
                            Ngày Nhà Giáo Việt Nam
                        </h2>
                    </div>

                    <!-- Heart animation -->
                    <div class="mb-12">
                        <div class="animate-pulse-scale">
                            <Heart class="text-pink-500 fill-pink-500" :size="64" />
                        </div>
                    </div>

                    <!-- Message -->
                    <div class="max-w-2xl mx-auto text-center mb-12 w-full opacity-0 animate-fade-in-delayed-2">
                        <div
                            class="bg-white/90 backdrop-blur-sm rounded-3xl p-6 md:p-12 shadow-2xl border border-purple-100">
                            <h3 class="text-xl md:text-3xl text-purple-800 mb-4 md:mb-6">
                                Kính gửi Cô <span class="font-bold">Lê Thị Hòa</span>
                            </h3>

                            <p class="text-purple-700 leading-relaxed text-base md:text-lg mb-6">
                                Nhân ngày Nhà giáo Việt Nam 20/11, chúng em xin gửi đến Cô Lê Thị Hòa
                                lời chúc sức khỏe, hạnh phúc và luôn tràn đầy nhiệt huyết trong sự nghiệp giáo dục.
                                Chúng em biết ơn những bài học, sự tận tâm và tình thương mà Cô đã dành cho chúng em.
                            </p>

                            <button @click="showMembers = true"
                                class="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 md:px-8 py-5 md:py-6 text-base md:text-lg shadow-lg w-full sm:w-auto rounded-md inline-flex items-center justify-center gap-2 transition-transform active:scale-95">
                                <Users :size="20" />
                                Lời chúc từ {{ members.length }} học sinh gửi Cô
                            </button>
                        </div>
                    </div>

                    <!-- Bottom quote -->
                    <p
                        class="text-purple-700 text-lg md:text-2xl italic text-center px-4 opacity-0 animate-fade-in-delayed-3">
                        "Không thầy đố mày làm nên"
                    </p>
                </div>

                <!-- MEMBERS SCREEN -->
                <div v-else key="members" class="relative z-10 min-h-screen py-6 md:py-8 px-4">
                    <!-- Header -->
                    <div class="max-w-7xl mx-auto mb-6 md:mb-8">
                        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                            <button @click="showMembers = false"
                                class="bg-white/80 hover:bg-white border border-purple-200 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 transition">
                                <ArrowLeft :size="20" />
                                Quay lại
                            </button>

                            <button @click="openAddDialog()"
                                class="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white w-full sm:w-auto rounded-md px-4 py-2 inline-flex items-center justify-center gap-2 transition">
                                <UserPlus :size="20" />
                                Thêm thành viên
                            </button>
                        </div>

                        <div class="text-center mb-6 md:mb-8">
                            <div
                                class="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm px-6 md:px-8 py-3 md:py-4 rounded-full shadow-lg mb-4">
                                <Users class="text-purple-600" :size="28" />
                                <h2 class="text-xl md:text-3xl text-purple-800">
                                    {{ members.length }} học sinh gửi lời chúc đến Cô <span class="font-bold">Lê Thị
                                        Hòa</span>
                                </h2>
                            </div>
                            <p class="text-purple-700 text-base md:text-lg">Chúng em xin gửi lời cảm ơn đến Cô</p>
                        </div>
                    </div>

                    <!-- Members Grid -->
                    <div class="max-w-7xl mx-auto">
                        <div v-if="members.length === 0" class="text-center py-16">
                            <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 max-w-md mx-auto">
                                <Users class="mx-auto text-purple-300 mb-4" :size="64" />
                                <h3 class="text-xl md:text-2xl text-purple-800 mb-2">Chưa có thành viên nào</h3>
                                <p class="text-purple-600 mb-6">Hãy thêm thành viên đầu tiên để gửi lời chúc!</p>
                                <button @click="openAddDialog()"
                                    class="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-md px-4 py-2 inline-flex items-center gap-2">
                                    <UserPlus :size="20" />
                                    Thêm thành viên ngay
                                </button>
                            </div>
                        </div>

                        <div v-else
                            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                            <div v-for="(member, index) in members" :key="member.id"
                                class="relative cursor-pointer group" @click="selectedMember = member">
                                <div class="bg-white/90 backdrop-blur-sm rounded-3xl p-4 md:p-6 shadow-xl border border-purple-100 transition-all hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02]"
                                    :style="{ transitionDelay: index * 50 + 'ms' }">
                                    <!-- Action buttons -->
                                    <div
                                        class="absolute top-2 right-2 flex gap-1 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            class="h-8 w-8 p-0 bg-white/90 hover:bg-blue-100 rounded-full inline-flex items-center justify-center"
                                            @click.stop="handleEditClick(member)" aria-label="Chỉnh sửa">
                                            <Edit2 :size="14" class="text-blue-600" />
                                        </button>
                                        <button
                                            class="h-8 w-8 p-0 bg-white/90 hover:bg-red-100 rounded-full inline-flex items-center justify-center"
                                            @click.stop="confirmDelete(member)" aria-label="Xoá">
                                            <Trash2 :size="14" class="text-red-600" />
                                        </button>
                                    </div>

                                    <!-- Name tag -->
                                    <div
                                        class="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 md:px-6 py-1.5 md:py-2 rounded-full shadow-lg z-10 max-w-[90%]">
                                        <span class="text-xs md:text-base truncate block">{{ member.name }}</span>
                                    </div>

                                    <!-- Character area -->
                                    <div class="relative mt-4">
                                        <!-- Avatar -->
                                        <div class="relative mx-auto w-24 h-24 md:w-32 md:h-32 mb-3 md:mb-4">
                                            <div class="w-full h-full animate-float-slow">
                                                <img v-if="member.image" :src="member.image" :alt="member.name"
                                                    class="w-full h-full rounded-full object-cover border-4 border-purple-200 shadow-lg" />
                                                <div v-else
                                                    class="w-full h-full rounded-full bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center border-4 border-purple-300 shadow-lg">
                                                    <User class="text-purple-600" :size="48" />
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Body & flowers (đơn giản hoá như bản gốc) -->
                                        <div class="relative">
                                            <div
                                                class="mx-auto w-20 h-24 md:w-24 md:h-32 bg-gradient-to-b from-purple-400 to-purple-500 rounded-t-full">
                                            </div>

                                            <div
                                                class="absolute top-6 md:top-8 left-1/2 -translate-x-1/2 w-32 md:w-40 flex justify-between items-center">
                                                <!-- Left arm -->
                                                <div class="relative -ml-6 md:-ml-8 animate-arm-left">
                                                    <div
                                                        class="w-2.5 md:w-3 h-12 md:h-16 bg-purple-400 rounded-full rotate-45">
                                                    </div>
                                                    <div class="absolute -top-4 -left-2 animate-flower-swing">
                                                        <svg width="40" height="40" viewBox="0 0 48 48" fill="none"
                                                            class="w-8 h-8 md:w-12 md:h-12">
                                                            <line x1="24" y1="48" x2="20" y2="20" stroke="#4ade80"
                                                                stroke-width="2" />
                                                            <line x1="24" y1="48" x2="24" y2="20" stroke="#4ade80"
                                                                stroke-width="2" />
                                                            <line x1="24" y1="48" x2="28" y2="20" stroke="#4ade80"
                                                                stroke-width="2" />
                                                            <circle cx="20" cy="12" r="6" fill="#ec4899" />
                                                            <circle cx="24" cy="8" r="6" fill="#f43f5e" />
                                                            <circle cx="28" cy="12" r="6" fill="#fbbf24" />
                                                            <circle cx="16" cy="16" r="5" fill="#a855f7" />
                                                            <circle cx="32" cy="16" r="5" fill="#fb923c" />
                                                            <circle cx="20" cy="12" r="2" fill="#fbbf24" />
                                                            <circle cx="24" cy="8" r="2" fill="#fbbf24" />
                                                            <circle cx="28" cy="12" r="2" fill="#fbbf24" />
                                                            <circle cx="16" cy="16" r="2" fill="#fbbf24" />
                                                            <circle cx="32" cy="16" r="2" fill="#fbbf24" />
                                                        </svg>
                                                    </div>
                                                </div>

                                                <!-- Right arm -->
                                                <div class="relative -mr-6 md:-mr-8 animate-arm-right">
                                                    <div
                                                        class="w-2.5 md:w-3 h-12 md:h-16 bg-purple-400 rounded-full -rotate-45">
                                                    </div>
                                                    <div class="absolute -top-4 -right-2 animate-flower-swing-2">
                                                        <svg width="40" height="40" viewBox="0 0 48 48" fill="none"
                                                            class="w-8 h-8 md:w-12 md:h-12">
                                                            <line x1="24" y1="48" x2="20" y2="20" stroke="#4ade80"
                                                                stroke-width="2" />
                                                            <line x1="24" y1="48" x2="24" y2="20" stroke="#4ade80"
                                                                stroke-width="2" />
                                                            <line x1="24" y1="48" x2="28" y2="20" stroke="#4ade80"
                                                                stroke-width="2" />
                                                            <circle cx="20" cy="12" r="6" fill="#f472b6" />
                                                            <circle cx="24" cy="8" r="6" fill="#fb7185" />
                                                            <circle cx="28" cy="12" r="6" fill="#c084fc" />
                                                            <circle cx="16" cy="16" r="5" fill="#fbbf24" />
                                                            <circle cx="32" cy="16" r="5" fill="#f97316" />
                                                            <circle cx="20" cy="12" r="2" fill="#fbbf24" />
                                                            <circle cx="24" cy="8" r="2" fill="#fbbf24" />
                                                            <circle cx="28" cy="12" r="2" fill="#fbbf24" />
                                                            <circle cx="16" cy="16" r="2" fill="#fbbf24" />
                                                            <circle cx="32" cy="16" r="2" fill="#fbbf24" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Message preview -->
                                    <div class="mt-4 md:mt-6 text-center px-2">
                                        <p class="text-purple-700 text-xs md:text-sm italic line-clamp-2">"{{
                                            member.message
                                            }}"</p>
                                        <p class="text-purple-500 text-xs mt-2">Bấm để xem đầy đủ</p>
                                    </div>
                                </div>

                                <!-- Floating sparkles -->
                                <div v-for="i in 3" :key="i"
                                    class="absolute text-yellow-400 pointer-events-none text-xs md:text-base animate-float"
                                    :style="{
                                        top: `${20 + (i - 1) * 30}%`,
                                        [i % 2 === 0 ? 'right' : 'left']: '-5px'
                                    }">
                                    ✨
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Footer message -->
                    <div v-if="members.length > 0" class="max-w-4xl mx-auto mt-12 md:mt-16 text-center">
                        <div
                            class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border border-purple-100">
                            <Heart class="mx-auto mb-4 text-pink-500 fill-pink-500" :size="40" />
                            <h3 class="text-xl md:text-3xl text-purple-800 mb-4">Lời chúc gửi đến <span
                                    class="font-bold">Lê
                                    Thị
                                    Hòa</span></h3>
                            <p class="text-purple-700 leading-relaxed text-base md:text-lg">
                                Kính chúc Cô luôn mạnh khỏe, hạnh phúc và thành công trong sự nghiệp trồng người.
                                Chúng em biết ơn sự tận tâm, kiến thức và tình yêu thương mà Cô đã dành cho lớp.
                            </p>
                            <p class="text-purple-600 mt-4 italic text-sm md:text-base">Ngày 20/11 - Ngày Nhà Giáo Việt
                                Nam
                            </p>
                        </div>
                    </div>
                </div>
            </Transition>

            <!-- ADD/EDIT MEMBER DIALOG -->
            <Transition name="fade">
                <div v-if="isAddDialogOpen" class="fixed inset-0 z-50">
                    <div class="fixed inset-0 bg-black/50 backdrop-blur-sm" @click="closeAddDialog" />
                    <div class="fixed inset-0 flex items-center justify-center p-4">
                        <div
                            class="bg-white max-w-lg w-full max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative p-6">
                            <!-- Close -->
                            <button
                                class="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/80 hover:bg-white inline-flex items-center justify-center"
                                @click="closeAddDialog" aria-label="Đóng">
                                <X :size="20" />
                            </button>

                            <h2 class="text-xl md:text-2xl font-semibold">
                                {{ editingMember ? 'Chỉnh sửa thành viên' : 'Thêm thành viên mới' }}
                            </h2>
                            <p class="text-gray-600">Điền thông tin thành viên và lời chúc gửi đến thầy cô</p>

                            <form @submit.prevent="handleSubmit" class="space-y-6 mt-4">
                                <!-- Name -->
                                <div class="space-y-2">
                                    <label for="name" class="font-medium">Tên thành viên *</label>
                                    <input id="name" v-model="name" type="text" placeholder="Nhập tên của bạn"
                                        class="w-full border rounded-md px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-purple-400" />
                                </div>

                                <!-- Message -->
                                <div class="space-y-2">
                                    <label for="message" class="font-medium">Lời chúc *</label>
                                    <textarea id="message" v-model="message" rows="5"
                                        placeholder="Nhập lời chúc của bạn dành cho thầy cô..."
                                        class="w-full border rounded-md px-3 py-2 text-base resize-none focus:outline-none focus:ring-2 focus:ring-purple-400" />
                                    <p class="text-xs text-gray-500">{{ message.length }} ký tự</p>
                                </div>

                                <!-- Image upload -->
                                <div class="space-y-2">
                                    <label for="image" class="font-medium">Ảnh đại diện (không bắt buộc)</label>

                                    <div v-if="imagePreview" class="relative inline-block">
                                        <img :src="imagePreview" alt="Preview"
                                            class="w-32 h-32 rounded-full object-cover border-4 border-purple-200" />
                                        <button type="button"
                                            class="absolute -top-2 -right-2 h-8 w-8 rounded-full inline-flex items-center justify-center bg-red-600 text-white hover:bg-red-700"
                                            @click="handleRemoveImage" aria-label="Xoá ảnh">
                                            <X :size="16" />
                                        </button>
                                    </div>

                                    <div v-else
                                        class="border-2 border-dashed border-purple-300 rounded-lg p-8 text-center cursor-pointer hover:border-purple-500 transition-colors"
                                        @click="fileInputRef?.click()">
                                        <Upload class="mx-auto text-purple-400 mb-2" :size="40" />
                                        <p class="text-sm text-purple-600">Bấm để chọn ảnh</p>
                                        <p class="text-xs text-gray-500 mt-1">JPG, PNG (tối đa 5MB)</p>
                                    </div>

                                    <input ref="fileInputRef" id="image" type="file" accept="image/*" class="hidden"
                                        @change="handleImageChange" />
                                </div>

                                <!-- Actions -->
                                <div class="flex flex-col sm:flex-row gap-3 pt-4">
                                    <button type="button"
                                        class="w-full sm:w-auto border rounded-md px-4 py-2 hover:bg-gray-50"
                                        @click="closeAddDialog">
                                        Hủy
                                    </button>
                                    <button type="submit"
                                        class="w-full sm:flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-md px-4 py-2">
                                        {{ editingMember ? 'Cập nhật' : 'Thêm thành viên' }}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Transition>

            <!-- MEMBER DETAIL DIALOG -->
            <Transition name="fade">
                <div v-if="selectedMember" class="fixed inset-0 z-50">
                    <div class="fixed inset-0 bg-black/50 backdrop-blur-sm" @click="selectedMember = null" />
                    <div class="fixed inset-0 flex items-center justify-center p-4" @click.stop>
                        <div
                            class="bg-gradient-to-br from-white via-purple-50 to-pink-50 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative p-6 md:p-10 animate-scale-in">
                            <button @click="selectedMember = null"
                                class="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/80 hover:bg-white inline-flex items-center justify-center"
                                aria-label="Đóng">
                                <X :size="20" />
                            </button>

                            <div class="text-center mb-8">
                                <div class="relative inline-block mb-6">
                                    <img v-if="selectedMember?.image" :src="selectedMember?.image || ''"
                                        :alt="selectedMember?.name || ''"
                                        class="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-purple-300 shadow-xl" />
                                    <div v-else
                                        class="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center border-4 border-purple-300 shadow-xl">
                                        <User class="text-purple-600" :size="80" />
                                    </div>

                                    <div class="absolute -top-2 -right-2 animate-rotate-slow">✨</div>
                                    <div class="absolute -bottom-2 -left-2 animate-rotate-slow-rev">🌸</div>
                                </div>

                                <h2
                                    class="text-2xl md:text-4xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                                    {{ selectedMember?.name }}
                                </h2>
                            </div>

                            <div
                                class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-purple-100">
                                <div class="flex items-center gap-2 mb-4">
                                    <Heart class="text-pink-500 fill-pink-500" :size="24" />
                                    <h3 class="text-lg md:text-xl text-purple-800">Lời chúc gửi Cô</h3>
                                </div>

                                <div class="relative">
                                    <div class="absolute -left-2 -top-2 text-purple-300 text-4xl">"</div>
                                    <p class="text-purple-700 leading-relaxed text-base md:text-lg pl-6 pr-6 italic">
                                        {{ selectedMember?.message }}
                                    </p>
                                    <div class="absolute -right-2 -bottom-2 text-purple-300 text-4xl">"</div>
                                </div>
                            </div>

                            <div class="mt-8 flex justify-center gap-4">
                                <div v-for="(f, i) in flowers" :key="i" class="text-2xl md:text-3xl animate-float"
                                    :style="{ animationDelay: i * 0.2 + 's' }">
                                    {{ f }}
                                </div>
                            </div>

                            <div class="mt-8 text-center">
                                <p class="text-purple-600 text-sm md:text-base italic">Ngày Nhà Giáo Việt Nam 20/11</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>
        </div>

    </template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import {
    collection,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
    onSnapshot,
} from "firebase/firestore";
import { db } from "./firebase";

import {
    Users,
    Heart,
    Sparkles,
    ArrowLeft,
    UserPlus,
    User,
    Edit2,
    Trash2,
    Upload,
    X,
} from "lucide-vue-next";

/* ------------------------------------------
   🎵 FIX NHẠC MOBILE iOS + ANDROID
------------------------------------------- */

const musicStarted = ref(false);
let player: any = null;

// Tạo div player KHÔNG ẩn bằng display:none để tránh mobile chặn
// Bạn để div này trong template theo dạng:
// <div id="music-player"
//      style="position:fixed;width:1px;height:1px;opacity:0;pointer-events:none;">
// </div>

// API YouTube khi đã load
function onYouTubeIframeAPIReady() {
    player = new YT.Player("music-player", {
        height: "1",
        width: "1",
        videoId: "XDfzWrg37fA",
        playerVars: {
            autoplay: 0,
            controls: 0,
            playsinline: 1,
            rel: 0,
            loop: 1,
            playlist: "XDfzWrg37fA",
        },
    });
}

(window as any).onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

// Load YouTube iframe API
onMounted(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
});

// Khi người dùng bấm nút — mobile sẽ cho phép playVideo
function startMusic() {
    musicStarted.value = true;

    setTimeout(() => {
        if (!player) return;

        player.loadVideoById("XDfzWrg37fA");
        player.playVideo();

        setTimeout(() => {
            player.unMute();
            player.setVolume(100);
        }, 500);
    }, 300);
}

/* -------------------------------------------------
   🎨 FIRESTORE + UI (GIỮ NGUYÊN)
--------------------------------------------------*/

interface Member {
    id: string;
    name: string;
    image: string | null;
    message: string;
}

const successMessage = ref("");

const members = ref<Member[]>([]);
const showMembers = ref(false);
const isAddDialogOpen = ref(false);

const selectedMember = ref<Member | null>(null);
const editingMember = ref<Member | null>(null);

const name = ref("");
const message = ref("");
const imagePreview = ref<string | null>(null);
const fileInputRef = ref<HTMLInputElement | null>(null);

// Background sparkles
const flowers = ["🌸", "🌺", "🌻", "🌷", "🌹"];
const bgSparkles = ref([]);

// Firestore realtime
onMounted(() => {
    const colRef = collection(db, "members");
    onSnapshot(colRef, (snapshot) => {
        members.value = snapshot.docs.map((d) => ({
            id: d.id,
            ...d.data(),
        })) as Member[];
    });

    bgSparkles.value = Array.from({ length: 15 }).map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: 3 + Math.random() * 2,
        delay: Math.random() * 2,
        size: 20 + Math.floor(Math.random() * 20),
    }));
});

/* -------------------------------------------------
   ẢNH — KHÔNG ĐỔI (TỐI ƯU MOBILE GIỮ NGUYÊN)
--------------------------------------------------*/

function compressImage(file: File): Promise<string> {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");

                let w = img.width;
                let h = img.height;
                const MAX_SIDE = 600;

                if (w > h) {
                    if (w > MAX_SIDE) {
                        h = (h * MAX_SIDE) / w;
                        w = MAX_SIDE;
                    }
                } else {
                    if (h > MAX_SIDE) {
                        w = (w * MAX_SIDE) / h;
                        h = MAX_SIDE;
                    }
                }

                canvas.width = w;
                canvas.height = h;
                ctx!.drawImage(img, 0, 0, w, h);

                let quality = 0.75;
                let base64 = canvas.toDataURL("image/jpeg", quality);

                while (base64.length / 1024 > 120 && quality > 0.3) {
                    quality -= 0.05;
                    base64 = canvas.toDataURL("image/jpeg", quality);
                }

                resolve(base64);
            };

            img.src = e.target?.result as string;
        };
    });
}

watch([editingMember, isAddDialogOpen], ([edit]) => {
    if (edit) {
        name.value = edit.name;
        message.value = edit.message;
        imagePreview.value = edit.image;
    } else {
        name.value = "";
        message.value = "";
        imagePreview.value = null;
    }
});

async function handleImageChange(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
        alert("Ảnh không hợp lệ! Hãy chọn JPG hoặc PNG.");
        return;
    }
    imagePreview.value = await compressImage(file);
}

function handleRemoveImage() {
    imagePreview.value = null;
    if (fileInputRef.value) fileInputRef.value.value = "";
}

async function handleSubmit() {
    if (!name.value.trim() || !message.value.trim()) {
        alert("Vui lòng nhập đầy đủ!");
        return;
    }

    const data = {
        name: name.value.trim(),
        message: message.value.trim(),
        image: imagePreview.value || null,
    };

    if (editingMember.value) {
        await updateDoc(doc(db, "members", editingMember.value.id), data);
        successMessage.value = "Cập nhật thành công!";
    } else {
        await addDoc(collection(db, "members"), data);
        successMessage.value = "Thêm thành viên thành công!";
    }

    closeAddDialog();
    name.value = "";
    message.value = "";
    imagePreview.value = null;
    if (fileInputRef.value) fileInputRef.value.value = "";

    setTimeout(() => (successMessage.value = ""), 2000);
}

async function handleDeleteMember(member: Member) {
    await deleteDoc(doc(db, "members", member.id));
    selectedMember.value = null;
}

function confirmDelete(member: Member) {
    if (confirm(`Bạn có chắc muốn xoá ${member.name}?`)) {
        handleDeleteMember(member);
    }
}

function handleEditClick(member: Member) {
    editingMember.value = member;
    isAddDialogOpen.value = true;
}

function openAddDialog() {
    editingMember.value = null;
    isAddDialogOpen.value = true;
}

function closeAddDialog() {
    isAddDialogOpen.value = false;
}

// Random hoa
onMounted(() => {
    document.querySelectorAll(".flower").forEach((el) => {
        const element = el as HTMLElement;

        element.style.setProperty("--x", Math.random() * 100 + "%");
        element.style.setProperty("--size", 16 + Math.random() * 24 + "px");
        element.style.setProperty("--opacity", (0.4 + Math.random() * 0.6).toString());
        element.style.setProperty("--duration", (4 + Math.random() * 6) + "s");
        element.style.setProperty("--sway", (Math.random() * 120 - 60) + "px");
        element.style.animationDelay = (-Math.random() * 8) + "s";
    });
});
</script>

<style scoped>
/* --- Transitions --- */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* Scale-in for dialog panel */
@keyframes scaleIn {
    0% {
        opacity: 0;
        transform: translateY(50px) scale(0.95);
    }

    100% {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

.animate-scale-in {
    animation: scaleIn 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
}

/* --- Recreated motion effects --- */
@keyframes floatY {
    0% {
        transform: translateY(0)
    }

    50% {
        transform: translateY(-10px)
    }

    100% {
        transform: translateY(0)
    }
}

.animate-float {
    animation: floatY 2s ease-in-out infinite;
}

.animate-float-slow {
    animation: floatY 2.2s ease-in-out infinite;
}

@keyframes pulseScale {

    0%,
    100% {
        transform: scale(1)
    }

    50% {
        transform: scale(1.2)
    }
}

.animate-pulse-scale {
    animation: pulseScale 1.5s ease-in-out infinite;
}

@keyframes wiggle {
    0% {
        transform: rotate(0deg)
    }

    25% {
        transform: rotate(5deg)
    }

    75% {
        transform: rotate(-5deg)
    }

    100% {
        transform: rotate(0deg)
    }
}

.animate-wiggle {
    animation: wiggle 3s ease-in-out infinite;
}

@keyframes gradientX {
    0% {
        background-position: 0% 0%
    }

    100% {
        background-position: 200% 0%
    }
}

.animate-gradient-x {
    animation: gradientX 5s linear infinite;
}

/* Delayed fades */
@keyframes fadeInUp {
    0% {
        opacity: 0;
        transform: translateY(20px)
    }

    100% {
        opacity: 1;
        transform: translateY(0)
    }
}

.opacity-0.animate-fade-in-delayed {
    animation: fadeInUp 0.5s ease 0.5s forwards;
}

.opacity-0.animate-fade-in-delayed-2 {
    animation: fadeInUp 0.5s ease 0.8s forwards;
}

.opacity-0.animate-fade-in-delayed-3 {
    animation: fadeInUp 0.5s ease 1.2s forwards;
}

/* Arms + flowers */
@keyframes armLeft {

    0%,
    100% {
        transform: rotate(0deg)
    }

    50% {
        transform: rotate(-10deg)
    }
}

@keyframes armRight {

    0%,
    100% {
        transform: rotate(0deg)
    }

    50% {
        transform: rotate(10deg)
    }
}

.animate-arm-left {
    animation: armLeft 2s ease-in-out infinite;
}

.animate-arm-right {
    animation: armRight 2s ease-in-out infinite;
}

@keyframes flowerSwing {

    0%,
    100% {
        transform: rotate(0deg) scale(1)
    }

    50% {
        transform: rotate(15deg) scale(1.1)
    }
}

@keyframes flowerSwing2 {

    0%,
    100% {
        transform: rotate(0deg) scale(1)
    }

    50% {
        transform: rotate(-15deg) scale(1.1)
    }
}

.animate-flower-swing {
    animation: flowerSwing 1.5s ease-in-out infinite;
}

.animate-flower-swing-2 {
    animation: flowerSwing2 1.5s ease-in-out infinite;
}

/* Slow rotations for decorations */
@keyframes rotateSlow {
    0% {
        transform: rotate(0)
    }

    100% {
        transform: rotate(360deg)
    }
}

@keyframes rotateSlowRev {
    0% {
        transform: rotate(360deg)
    }

    100% {
        transform: rotate(0)
    }
}

.animate-rotate-slow {
    animation: rotateSlow 20s linear infinite;
}

.animate-rotate-slow-rev {
    animation: rotateSlowRev 15s linear infinite;
}

/* ---------------------------------------
   🌸 HOA ĐÀO RƠI MƯỢT 60FPS — BẢN MỚI
---------------------------------------- */

.falling-flowers {
    position: fixed;
    inset: 0;
    overflow: hidden;
    z-index: 1;
    pointer-events: none;
}

.flower {
    position: absolute;
    top: -10vh;
    left: var(--x);
    font-size: var(--size);
    opacity: var(--opacity);
    transform: translate3d(0, 0, 0);
    animation: fallAndSway var(--duration) linear infinite;
    will-change: transform;
}

/* Combines fall + sway + rotate in one animation */
@keyframes fallAndSway {
    0% {
        transform: translate3d(0, -10vh, 0) rotate(0deg);
        opacity: 1;
    }

    50% {
        transform: translate3d(var(--sway), 50vh, 0) rotate(180deg);
        opacity: 0.7;
    }

    100% {
        transform: translate3d(calc(var(--sway) * -1), 110vh, 0) rotate(360deg);
        opacity: 0.3;
    }
}
</style>
