import cv2
import pyzbar.pyzbar as pyzbar
import webbrowser


def decodeDisplay(image):
    #detect barcode and decode
    barcodes = pyzbar.decode(image)
    for barcode in barcodes:
        # Position of the bounding box for barcode extraction (x,y) coordinate, width and height
        # Draw the bounding box of the barcode in the image

        # cv2.rectangle(image, pt1, pt2, rgb color, thickness)
        #x1,y1 ------
        #|           |
        #|           |
        #|           |
        # --------x2,y2

        (x, y, w, h) = barcode.rect
        cv2.rectangle(image, (x, y), (x + w, y + h), (255, 0, 0), 1)
 
        #decode the barcode to urf-8 string and get the type of the barcode
        barcodeData = barcode.data.decode("utf-8")
        barcodeType = barcode.type

        #open in browser after decode in to url and quit, otherwise the browser will keep opening new pages
        while True:
            url = "http://" + str(barcodeData)
            print(barcodeType + ": " + url)
            webbrowser.open(url)   
            quit()
    return image

    
 
 
def detect():
    #choose built-in camera
    camera = cv2.VideoCapture(0)
 
    while True:
        # Read frame by frame Retrieve images
        ret, frame = camera.read()
        # Convert images to grayscale
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        img = decodeDisplay(gray)
        
        #The waitkey controls the duration of the imshow
        cv2.imshow("camera", img)
        cv2.waitKey(5)

    #stop camera
    camera.release()
    cv2.destroyAllWindows()
 
 
if __name__ == '__main__':
    detect()
